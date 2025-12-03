import { beforeEach, describe, expect, test } from 'vitest';
import { createMemoryCache, createNullCache } from '../../cache';
import { createNullLogger } from '../../logger';
import { createTransporter } from '../../transporter';
import type { AlgoliaAgent } from '../../types';

describe('transporter cache', () => {
  let requestCount: number;
  beforeEach(() => {
    requestCount = 0;
  });

  const algoliaAgent: AlgoliaAgent = {
    value: 'test',
    add: () => algoliaAgent,
  };

  const transporter = createTransporter({
    hosts: [{ url: 'localhost', accept: 'readWrite', protocol: 'https' }],
    hostsCache: createNullCache(),
    baseHeaders: {},
    baseQueryParameters: {},
    algoliaAgent,
    logger: createNullLogger(),
    timeouts: {
      connect: 1000,
      read: 2000,
      write: 3000,
    },
    requester: {
      send: async () => {
        requestCount++;
        return {
          status: 200,
          content: JSON.stringify({ value: requestCount }),
          isTimedOut: false,
        };
      },
    },
    requestsCache: createMemoryCache(),
    responsesCache: createMemoryCache(),
  });

  test('uses cache for cacheable requests', async () => {
    const firstResponse = await transporter.request<{ value: number }>(
      { method: 'GET', path: '/test-1', queryParameters: {}, headers: {}, cacheable: true },
      {},
    );
    const secondResponse = await transporter.request<{ value: number }>(
      { method: 'GET', path: '/test-1', queryParameters: {}, headers: {}, cacheable: true },
      {},
    );

    // Should use cached response, so both values are the same and only 1 request made
    expect(firstResponse).toEqual({ value: 1 });
    expect(secondResponse).toEqual({ value: 1 });
    expect(requestCount).toBe(1);
  });

  test('does not use cache for implicit non-cacheable requests', async () => {
    const firstResponse = await transporter.request<{ value: number }>(
      { method: 'POST', path: '/test-2', queryParameters: {}, headers: {} },
      {},
    );
    const secondResponse = await transporter.request<{ value: number }>(
      { method: 'POST', path: '/test-2', queryParameters: {}, headers: {} },
      {},
    );

    // Should NOT use cache, so each request increments the counter
    expect(firstResponse).toEqual({ value: 1 });
    expect(secondResponse).toEqual({ value: 2 });
    expect(requestCount).toBe(2);
  });

  test('does not use cache for explicit non-cacheable requests', async () => {
    const firstResponse = await transporter.request<{ value: number }>(
      { method: 'POST', path: '/test-3', queryParameters: {}, headers: {}, cacheable: false },
      {},
    );
    const secondResponse = await transporter.request<{ value: number }>(
      { method: 'POST', path: '/test-3', queryParameters: {}, headers: {}, cacheable: false },
      {},
    );

    // Should NOT use cache, so each request increments the counter
    expect(firstResponse).toEqual({ value: 1 });
    expect(secondResponse).toEqual({ value: 2 });
    expect(requestCount).toBe(2);
  });

  test('uses cache for POST requests marked as cacheable', async () => {
    const firstResponse = await transporter.request<{ value: number }>(
      { method: 'POST', path: '/test-4', queryParameters: {}, headers: {}, cacheable: true },
      {},
    );
    const secondResponse = await transporter.request<{ value: number }>(
      { method: 'POST', path: '/test-4', queryParameters: {}, headers: {}, cacheable: true },
      {},
    );

    // Should use cached response, so both values are the same and only 1 request made
    expect(firstResponse).toEqual({ value: 1 });
    expect(secondResponse).toEqual({ value: 1 });
    expect(requestCount).toBe(1);
  });

  test('accepts cacheable from request options', async () => {
    const firstResponse = await transporter.request<{ value: number }>(
      { method: 'GET', path: '/test-5', queryParameters: {}, headers: {}, cacheable: false },
      { cacheable: true },
    );
    const secondResponse = await transporter.request<{ value: number }>(
      { method: 'GET', path: '/test-5', queryParameters: {}, headers: {}, cacheable: false },
      { cacheable: true },
    );

    // Should use cached response, so both values are the same and only 1 request made
    expect(firstResponse).toEqual({ value: 1 });
    expect(secondResponse).toEqual({ value: 1 });
    expect(requestCount).toBe(1);
  });
});
