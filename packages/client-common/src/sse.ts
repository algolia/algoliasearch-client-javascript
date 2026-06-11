/**
 * WHATWG-compliant Server-Sent Events parser.
 *
 * Three-layer architecture:
 *   1. iterLines()    — byte chunking → line decoding
 *   2. SSEDecoder     — line → SSE event decoding
 *   3. iterSSEEvents  — top-level composer (exported)
 *
 * @see https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
 */

const MAX_LINE_BUFFER_SIZE = 10 * 1024 * 1024; // 10MB

// ─── Types ──────────────────────────────────────────────────────────────────

export type ServerSentEvent = {
  /** Concatenated data: field values, joined by '\n'. */
  data: string;
  /** Event type from the event: field. Defaults to "" (empty string). */
  event: string;
  /** Last event ID. Persists across dispatches until changed. */
  id: string | null;
  /** Reconnection time in ms. Persists across dispatches until changed. */
  retry: number | null;
};

/**
 * Wrapper for a parsed SSE event, yielded by the typed `*Stream` methods.
 *
 * - `data` is the JSON-parsed payload when parsing succeeds, `null` otherwise.
 * - `raw` is the original {@link ServerSentEvent} (always present).
 * - `error` is set when JSON parsing of `event.data` failed.
 */
export type StreamEvent<T = Record<string, unknown>> = {
  /** Parsed data from the event, or `null` if parsing failed. */
  data: T | null;
  /** The original, unparsed SSE event. */
  raw: ServerSentEvent;
  /** The error that occurred while parsing `event.data`, if any. */
  error?: Error;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Converts a ReadableStream into an AsyncIterable via getReader().
 * Fallback for environments where ReadableStream lacks Symbol.asyncIterator.
 */
async function* readableStreamToAsyncIterable(stream: ReadableStream<Uint8Array>): AsyncGenerator<Uint8Array> {
  const reader = stream.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Normalizes the input to an AsyncIterable<Uint8Array>.
 * Prefers Symbol.asyncIterator if available; falls back to getReader().
 */
function toAsyncIterable(stream: ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>): AsyncIterable<Uint8Array> {
  if (Symbol.asyncIterator in stream) {
    return stream as AsyncIterable<Uint8Array>;
  }
  return readableStreamToAsyncIterable(stream as ReadableStream<Uint8Array>);
}

// ─── Layer 1: Byte stream → Lines ──────────────────────────────────────────

/**
 * Yields individual lines from a byte stream.
 *
 * Handles \r, \n, and \r\n line endings, including \r\n split across chunks.
 * Uses offset tracking within each decoded chunk to avoid O(n²) buffer growth.
 * Strips BOM (U+FEFF) from the very first line.
 * Throws if the internal line buffer exceeds 10MB.
 */
async function* iterLines(stream: ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>): AsyncGenerator<string> {
  const decoder = new TextDecoder('utf-8');
  const buffer: string[] = [];
  let bufferSize = 0;
  let trailingCR = false;
  let isFirstLine = true;

  for await (const chunk of toAsyncIterable(stream)) {
    const text = decoder.decode(chunk, { stream: true });
    let offset = 0;

    // Handle \r\n split across chunks: if the previous chunk ended with \r
    // and this one starts with \n, skip the \n (it's the second half of \r\n)
    if (trailingCR) {
      trailingCR = false;
      if (text.length > 0 && text[0] === '\n') {
        offset = 1;
      }
    }

    while (offset < text.length) {
      const crIdx = text.indexOf('\r', offset);
      const lfIdx = text.indexOf('\n', offset);

      // No more line endings in this chunk — buffer the rest
      if (crIdx === -1 && lfIdx === -1) {
        const remaining = text.slice(offset);
        buffer.push(remaining);
        bufferSize += remaining.length;
        if (bufferSize > MAX_LINE_BUFFER_SIZE) {
          throw new Error('SSE line buffer exceeded 10MB');
        }
        break;
      }

      let endIdx: number;
      let skipLen: number;

      if (crIdx !== -1 && (lfIdx === -1 || crIdx < lfIdx)) {
        // \r found before \n (or no \n at all)
        endIdx = crIdx;
        if (crIdx + 1 < text.length) {
          // Peek ahead: \r\n or bare \r
          skipLen = text[crIdx + 1] === '\n' ? 2 : 1;
        } else {
          // \r at end of chunk — might be \r\n split across chunks
          trailingCR = true;
          skipLen = 1;
        }
      } else {
        // \n found before \r (or no \r at all)
        // Safe: at least one of crIdx/lfIdx is != -1, and we're in the else
        // branch, so lfIdx must be != -1
        endIdx = lfIdx;
        skipLen = 1;
      }

      const segment = text.slice(offset, endIdx);
      buffer.push(segment);

      let line = buffer.length === 1 ? buffer[0]! : buffer.join('');
      buffer.length = 0;
      bufferSize = 0;

      // Strip BOM from the very first line only
      if (isFirstLine) {
        if (line.startsWith('\uFEFF')) {
          line = line.slice(1);
        }
        isFirstLine = false;
      }

      yield line;
      offset = endIdx + skipLen;
    }
  }

  // Flush TextDecoder (handles any remaining bytes from multi-byte sequences)
  const remaining = decoder.decode();
  if (remaining) {
    buffer.push(remaining);
  }

  // Yield any remaining buffered content as the final line
  if (buffer.length > 0) {
    let line = buffer.join('');
    if (isFirstLine && line.startsWith('\uFEFF')) {
      line = line.slice(1);
    }
    yield line;
  }
}

// ─── Layer 2: Lines → SSE Events ──────────────────────────────────────────

/**
 * Stateful SSE event decoder. Feed lines one at a time via decode().
 * Returns a ServerSentEvent on blank lines (dispatch), null otherwise.
 *
 * Per WHATWG spec §9.2.6:
 * - lastEventId persists across dispatches
 * - retry persists across dispatches (global reconnection setting)
 * - eventType resets after every blank line (even when data is empty)
 * - data buffer resets after dispatch
 * - id field containing NULL (\0) is ignored entirely
 * - retry field must be ASCII digits only
 */
class SSEDecoder {
  private data: string[] = [];
  private eventType = '';
  private lastEventId: string | null = null;
  private retry: number | null = null;

  decode(line: string): ServerSentEvent | null {
    // Blank line → dispatch event or reset
    if (line === '') {
      return this.dispatch();
    }

    // Comment line (starts with ':')
    if (line[0] === ':') {
      return null;
    }

    // Parse field:value
    const colonIdx = line.indexOf(':');
    let field: string;
    let value: string;

    if (colonIdx === -1) {
      // No colon → field is entire line, value is empty
      field = line;
      value = '';
    } else {
      field = line.slice(0, colonIdx);
      value = line.slice(colonIdx + 1);
      // Strip exactly ONE leading space (if present)
      if (value[0] === ' ') {
        value = value.slice(1);
      }
    }

    switch (field) {
      case 'data':
        this.data.push(value);
        break;
      case 'event':
        this.eventType = value;
        break;
      case 'id':
        // Ignore if value contains NULL character (security: WHATWG spec)
        if (!value.includes('\0')) {
          this.lastEventId = value;
        }
        break;
      case 'retry':
        // Must consist of ASCII digits only (no negatives, no whitespace)
        if (/^[0-9]+$/.test(value)) {
          this.retry = parseInt(value, 10);
        }
        break;
      // Unknown fields: ignore silently
    }

    return null;
  }

  private dispatch(): ServerSentEvent | null {
    // eventType resets on every blank line per WHATWG spec,
    // regardless of whether we actually dispatch an event
    const currentEventType = this.eventType;
    this.eventType = '';

    // Suppress dispatch when no data: lines were received
    if (this.data.length === 0) {
      return null;
    }

    const event: ServerSentEvent = {
      data: this.data.join('\n'),
      event: currentEventType,
      id: this.lastEventId,
      retry: this.retry,
    };

    // Reset data buffer; lastEventId and retry persist across dispatches
    this.data = [];

    return event;
  }
}

// ─── Layer 3: Top-level composer ──────────────────────────────────────────

/**
 * Parses a byte stream as WHATWG Server-Sent Events.
 *
 * Accepts both ReadableStream<Uint8Array> (browser fetch) and
 * AsyncIterable<Uint8Array> (Node.js streams / Buffer chunks).
 *
 * @example
 * ```ts
 * const response = await fetch(url);
 * for await (const event of iterSSEEvents(response.body!)) {
 *   console.log(event.event, event.data);
 * }
 * ```
 */
export async function* iterSSEEvents(
  stream: ReadableStream<Uint8Array> | AsyncIterable<Uint8Array>,
): AsyncGenerator<ServerSentEvent> {
  const decoder = new SSEDecoder();
  for await (const line of iterLines(stream)) {
    const event = decoder.decode(line);
    if (event !== null) {
      yield event;
    }
  }
}
