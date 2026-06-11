import { describe, expect, test } from 'vitest';

import { iterSSEEvents, type ServerSentEvent } from '../sse';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Encode each string argument as a separate Uint8Array chunk in an AsyncIterable. */
function toStream(...chunks: string[]): AsyncIterable<Uint8Array> {
  const encoder = new TextEncoder();
  return {
    async *[Symbol.asyncIterator]() {
      for (const chunk of chunks) {
        yield encoder.encode(chunk);
      }
    },
  };
}

/** Feed chunks through iterSSEEvents and collect all emitted events. */
async function collectEvents(...chunks: string[]): Promise<ServerSentEvent[]> {
  const events: ServerSentEvent[] = [];
  for await (const event of iterSSEEvents(toStream(...chunks))) {
    events.push(event);
  }
  return events;
}

/** Base event with all defaults — spread to override specific fields. */
const BASE: ServerSentEvent = { data: '', event: '', id: null, retry: null };

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('iterSSEEvents', () => {
  describe('WHATWG spec cases', () => {
    test('1. single data event', async () => {
      const events = await collectEvents('data: hello\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hello' });
    });

    test('2. multi-line data', async () => {
      const events = await collectEvents('data: line1\ndata: line2\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'line1\nline2' });
    });

    test('3. event type', async () => {
      const events = await collectEvents('event: custom\ndata: hi\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, event: 'custom', data: 'hi' });
    });

    test('4. comment ignored', async () => {
      const events = await collectEvents(': comment\ndata: hi\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hi' });
    });

    test('5. empty data suppressed (no event dispatched)', async () => {
      const events = await collectEvents('event: ping\n\n');
      expect(events).toHaveLength(0);
    });

    test('6. field with no colon', async () => {
      const events = await collectEvents('data\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: '' });
    });

    test('7. single space strip (two spaces in → one space out)', async () => {
      const events = await collectEvents('data:  hello\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: ' hello' });
    });

    test('8. unknown field ignored', async () => {
      const events = await collectEvents('foo: bar\ndata: hi\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hi' });
    });

    test('9. id persistence across dispatches', async () => {
      const events = await collectEvents('id: 42\ndata: a\n\ndata: b\n\n');
      expect(events).toHaveLength(2);
      expect(events[0]).toEqual({ ...BASE, data: 'a', id: '42' });
      expect(events[1]).toEqual({ ...BASE, data: 'b', id: '42' });
    });

    test('10. id with NULL character ignored', async () => {
      const events = await collectEvents('id: foo\0bar\ndata: hi\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hi' });
    });

    test('11. retry with digits only', async () => {
      const events = await collectEvents('retry: 3000\ndata: hi\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hi', retry: 3000 });
    });

    test('12. retry with non-digits ignored', async () => {
      const events = await collectEvents('retry: 3s\ndata: hi\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hi' });
    });

    test('13. CR line endings', async () => {
      const events = await collectEvents('data: hello\r\r');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hello' });
    });

    test('14. CRLF line endings', async () => {
      const events = await collectEvents('data: hello\r\n\r\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hello' });
    });

    test('15. mixed line endings', async () => {
      const events = await collectEvents('data: a\rdata: b\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'a\nb' });
    });

    test('16. stream ends mid-event (no dispatch)', async () => {
      const events = await collectEvents('data: partial');
      expect(events).toHaveLength(0);
    });
  });

  describe('chunk boundary handling', () => {
    test('17. trailingCR across chunk boundaries', async () => {
      const events = await collectEvents('data: hello\r', '\ndata: world\r\n\r\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hello\nworld' });
    });
  });

  describe('safety limits', () => {
    test('18. 10MB buffer cap throws', async () => {
      const chunk = 'a'.repeat(2 * 1024 * 1024); // 2MB per chunk, no newlines
      const chunks = Array<string>(6).fill(chunk); // 12MB total > 10MB limit
      await expect(collectEvents(...chunks)).rejects.toThrow('SSE line buffer exceeded 10MB');
    });
  });

  describe('eventType reset', () => {
    test('19. eventType resets on suppressed dispatch', async () => {
      // First blank line: eventType="custom" but no data → suppressed, eventType resets to ""
      // Second event: data="hi" with eventType="" (not "custom")
      const events = await collectEvents('event: custom\n\ndata: hi\n\n');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({ ...BASE, data: 'hi', event: '' });
    });
  });
});
