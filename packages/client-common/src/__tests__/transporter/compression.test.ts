import { gunzipSync } from 'fflate';
import { beforeEach, describe, expect, test } from 'vitest';
import { createMemoryCache, createNullCache } from '../../cache';
import { createNullLogger } from '../../logger';
import { createTransporter } from '../../transporter';
import { COMPRESSION_THRESHOLD } from '../../transporter/compress';
import type { AlgoliaAgent, EndRequest } from '../../types';

// A payload large enough to exceed COMPRESSION_THRESHOLD
const largePayload = { data: 'x'.repeat(COMPRESSION_THRESHOLD + 1) };

const algoliaAgent: AlgoliaAgent = {
  value: 'test',
  add: () => algoliaAgent,
};

function makeTransporter(compression?: 'gzip', onRequest?: (req: EndRequest) => void) {
  return createTransporter({
    hosts: [{ url: 'localhost', accept: 'readWrite', protocol: 'https' }],
    hostsCache: createNullCache(),
    baseHeaders: {},
    baseQueryParameters: {},
    algoliaAgent,
    logger: createNullLogger(),
    timeouts: { connect: 1000, read: 2000, write: 3000 },
    ...(compression ? { compression } : {}),
    requester: {
      send: async (req) => {
        onRequest?.(req);
        return { status: 200, content: '{}', isTimedOut: false };
      },
    },
    requestsCache: createMemoryCache(),
    responsesCache: createMemoryCache(),
  });
}

describe('compression', () => {
  let captured: EndRequest | undefined;

  beforeEach(() => {
    captured = undefined;
  });

  test('does not compress when compression is not configured', async () => {
    const transporter = makeTransporter(undefined, (req) => {
      captured = req;
    });

    await transporter.request({
      method: 'POST',
      path: '/test',
      queryParameters: {},
      headers: {},
      data: { foo: 'bar' },
    });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBeUndefined();
    expect(typeof captured!.data).toBe('string');
    expect(captured!.data).toBe('{"foo":"bar"}');
  });

  test('compresses POST body when compression is gzip', async () => {
    const transporter = makeTransporter('gzip', (req) => {
      captured = req;
    });

    await transporter.request({ method: 'POST', path: '/test', queryParameters: {}, headers: {}, data: largePayload });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBe('gzip');
    expect(captured!.data).toBeInstanceOf(Uint8Array);

    const decompressed = new TextDecoder().decode(gunzipSync(captured!.data as Uint8Array));
    expect(decompressed).toBe(JSON.stringify(largePayload));
  });

  test('compresses PUT body when compression is gzip', async () => {
    const transporter = makeTransporter('gzip', (req) => {
      captured = req;
    });

    await transporter.request({ method: 'PUT', path: '/test', queryParameters: {}, headers: {}, data: largePayload });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBe('gzip');
    expect(captured!.data).toBeInstanceOf(Uint8Array);

    const decompressed = new TextDecoder().decode(gunzipSync(captured!.data as Uint8Array));
    expect(decompressed).toBe(JSON.stringify(largePayload));
  });

  test('does not compress POST when body is below threshold', async () => {
    const transporter = makeTransporter('gzip', (req) => {
      captured = req;
    });

    await transporter.request({
      method: 'POST',
      path: '/test',
      queryParameters: {},
      headers: {},
      data: { foo: 'bar' },
    });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBeUndefined();
    expect(typeof captured!.data).toBe('string');
  });

  test('does not compress GET requests', async () => {
    const transporter = makeTransporter('gzip', (req) => {
      captured = req;
    });

    await transporter.request({ method: 'GET', path: '/test', queryParameters: {}, headers: {} });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBeUndefined();
    expect(captured!.data).toBeUndefined();
  });

  test('does not compress POST when body is empty', async () => {
    const transporter = makeTransporter('gzip', (req) => {
      captured = req;
    });

    await transporter.request({ method: 'POST', path: '/test', queryParameters: {}, headers: {} });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBeUndefined();
    expect(captured!.data).toBeUndefined();
  });
});
