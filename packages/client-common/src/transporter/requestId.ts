import type { Headers, QueryParameters, RequestOptions, Transporter } from '../types';

const BASE62_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const REQUEST_ID_LENGTH = 11;

export function generateRequestId(): string {
  let requestId = '';

  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    const bytes = new Uint8Array(REQUEST_ID_LENGTH);
    globalThis.crypto.getRandomValues(bytes);
    for (const byte of bytes) {
      requestId += BASE62_CHARS[byte % BASE62_CHARS.length];
    }

    return requestId;
  }

  for (let i = 0; i < REQUEST_ID_LENGTH; i++) {
    requestId += BASE62_CHARS[Math.floor(Math.random() * BASE62_CHARS.length)];
  }

  return requestId;
}

function hasRequestId(headers: Headers | undefined, queryParameters: QueryParameters | undefined): boolean {
  return (
    (headers !== undefined && Object.keys(headers).some((header) => header.toLowerCase() === 'request-id')) ||
    (queryParameters !== undefined &&
      Object.keys(queryParameters).some((parameter) => parameter.toLowerCase() === 'x-algolia-request-id'))
  );
}

/**
 * Returns request options carrying a Request-ID on the transporter's channel, so that every
 * request a multi-request helper performs shares the same ID. Returns the options unchanged
 * when the channel is off or when a Request-ID is already supplied. Never apply ahead of a
 * cacheable operation: the ID enters the cache key and defeats caching and deduplication.
 */
export function withRequestId(
  transporter: Pick<Transporter, 'requestIdChannel' | 'baseHeaders' | 'baseQueryParameters'>,
  requestOptions?: RequestOptions | undefined,
): RequestOptions | undefined {
  if (
    transporter.requestIdChannel === undefined ||
    hasRequestId(transporter.baseHeaders, transporter.baseQueryParameters) ||
    hasRequestId(requestOptions?.headers, requestOptions?.queryParameters)
  ) {
    return requestOptions;
  }

  if (transporter.requestIdChannel === 'headers') {
    return { ...requestOptions, headers: { ...requestOptions?.headers, 'request-id': generateRequestId() } };
  }

  return {
    ...requestOptions,
    queryParameters: { ...requestOptions?.queryParameters, 'x-algolia-request-id': generateRequestId() },
  };
}
