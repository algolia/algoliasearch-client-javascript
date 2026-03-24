import { gunzipSync, gzipSync } from 'node:zlib';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createMemoryCache, createNullCache } from '../../cache';
import { createNullLogger } from '../../logger';
import { createTransporter } from '../../transporter';
import { COMPRESSION_THRESHOLD } from '../../transporter/compress';
import type { AlgoliaAgent, EndRequest, Logger } from '../../types';

const largePayload = { data: 'x'.repeat(COMPRESSION_THRESHOLD + 1) };

const algoliaAgent: AlgoliaAgent = {
  value: 'test',
  add: () => algoliaAgent,
};

async function gzipCompress(data: string): Promise<Uint8Array> {
  return gzipSync(Buffer.from(data));
}

function makeTransporter(opts: {
  compress?: (data: string) => Promise<Uint8Array>;
  compression?: 'gzip';
  logger?: Logger;
  onRequest?: (req: EndRequest) => void;
}) {
  return createTransporter({
    hosts: [{ url: 'localhost', accept: 'readWrite', protocol: 'https' }],
    hostsCache: createNullCache(),
    baseHeaders: {},
    baseQueryParameters: {},
    algoliaAgent,
    logger: opts.logger ?? createNullLogger(),
    timeouts: { connect: 1000, read: 2000, write: 3000 },
    ...(opts.compress ? { compress: opts.compress } : {}),
    ...(opts.compression ? { compression: opts.compression } : {}),
    requester: {
      send: async (req) => {
        opts.onRequest?.(req);
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

  test('does not compress when compression is not enabled', async () => {
    const transporter = makeTransporter({
      compress: gzipCompress,
      onRequest: (req) => {
        captured = req;
      },
    });

    await transporter.request({ method: 'POST', path: '/test', queryParameters: {}, headers: {}, data: largePayload });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBeUndefined();
    expect(typeof captured!.data).toBe('string');
  });

  test('compresses POST body when compression is gzip and compress is provided', async () => {
    const transporter = makeTransporter({
      compress: gzipCompress,
      compression: 'gzip',
      onRequest: (req) => {
        captured = req;
      },
    });

    await transporter.request({ method: 'POST', path: '/test', queryParameters: {}, headers: {}, data: largePayload });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBe('gzip');
    expect(captured!.data).toBeInstanceOf(Uint8Array);

    const decompressed = gunzipSync(Buffer.from(captured!.data as Uint8Array)).toString();
    expect(decompressed).toBe(JSON.stringify(largePayload));
  });

  test('compresses PUT body when compression is gzip and compress is provided', async () => {
    const transporter = makeTransporter({
      compress: gzipCompress,
      compression: 'gzip',
      onRequest: (req) => {
        captured = req;
      },
    });

    await transporter.request({ method: 'PUT', path: '/test', queryParameters: {}, headers: {}, data: largePayload });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBe('gzip');
    expect(captured!.data).toBeInstanceOf(Uint8Array);

    const decompressed = gunzipSync(Buffer.from(captured!.data as Uint8Array)).toString();
    expect(decompressed).toBe(JSON.stringify(largePayload));
  });

  test('does not compress POST when body is below threshold', async () => {
    const transporter = makeTransporter({
      compress: gzipCompress,
      compression: 'gzip',
      onRequest: (req) => {
        captured = req;
      },
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
    const transporter = makeTransporter({
      compress: gzipCompress,
      compression: 'gzip',
      onRequest: (req) => {
        captured = req;
      },
    });

    await transporter.request({ method: 'GET', path: '/test', queryParameters: {}, headers: {} });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBeUndefined();
    expect(captured!.data).toBeUndefined();
  });

  test('logs warning when compression is gzip but compress method is missing', async () => {
    const logger: Logger = { debug: vi.fn(), info: vi.fn(), error: vi.fn() };
    const transporter = makeTransporter({
      compression: 'gzip',
      logger,
      onRequest: (req) => {
        captured = req;
      },
    });

    await transporter.request({ method: 'POST', path: '/test', queryParameters: {}, headers: {}, data: largePayload });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBeUndefined();
    expect(typeof captured!.data).toBe('string');
    expect(logger.info).toHaveBeenCalledWith('Compression is disabled because no compress method is available.');
  });

  test('silently sends uncompressed when compression is gzip, compress is missing, and null logger', async () => {
    const transporter = makeTransporter({
      compression: 'gzip',
      onRequest: (req) => {
        captured = req;
      },
    });

    await transporter.request({ method: 'POST', path: '/test', queryParameters: {}, headers: {}, data: largePayload });

    expect(captured).toBeDefined();
    expect(captured!.headers['content-encoding']).toBeUndefined();
    expect(typeof captured!.data).toBe('string');
  });
});
