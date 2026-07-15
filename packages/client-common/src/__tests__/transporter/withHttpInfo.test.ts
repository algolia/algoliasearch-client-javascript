import { describe, expect, test } from 'vitest';
import { createMemoryCache, createNullCache } from '../../cache';
import { createNullLogger } from '../../logger';
import { ApiError, DetailedApiError, createTransporter } from '../../transporter';
import type { AlgoliaAgent, Requester, TransporterWithHttpInfo } from '../../types';

describe('transporter requestWithHttpInfo', () => {
  const algoliaAgent: AlgoliaAgent = {
    value: 'test',
    add: () => algoliaAgent,
  };

  function createTestTransporter(requester: Requester): TransporterWithHttpInfo {
    return createTransporter({
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
      requester,
      requestsCache: createMemoryCache(),
      responsesCache: createMemoryCache(),
    });
  }

  test('resolves with the status, headers, content and the same deserialized data as `request`', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 200,
        content: JSON.stringify({ value: 42 }),
        headers: { 'x-served-by': 'test-host' },
        isTimedOut: false,
      }),
    });

    const response = await transporter.requestWithHttpInfo<{ value: number }>({
      method: 'GET',
      path: '/test',
      queryParameters: {},
      headers: {},
    });

    expect(response).toEqual({
      status: 200,
      headers: { 'x-served-by': 'test-host' },
      content: JSON.stringify({ value: 42 }),
      data: { value: 42 },
    });

    const data = await transporter.request<{ value: number }>({
      method: 'GET',
      path: '/test',
      queryParameters: {},
      headers: {},
    });

    expect(response.data).toEqual(data);
  });

  test('leaves `headers` undefined when the requester does not capture them', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 200,
        content: JSON.stringify({ value: 42 }),
        isTimedOut: false,
      }),
    });

    const response = await transporter.requestWithHttpInfo<{ value: number }>({
      method: 'GET',
      path: '/test',
      queryParameters: {},
      headers: {},
    });

    expect(response.headers).toBeUndefined();
  });

  test('resolves with `undefined` data on 204 empty responses', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 204,
        content: '',
        headers: {},
        isTimedOut: false,
      }),
    });

    const response = await transporter.requestWithHttpInfo<undefined>({
      method: 'DELETE',
      path: '/test',
      queryParameters: {},
      headers: {},
    });

    expect(response.status).toBe(204);
    expect(response.content).toBe('');
    expect(response.data).toBeUndefined();
  });

  test('throws the same errors as `request` on non-2xx responses', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 403,
        content: JSON.stringify({ message: 'Invalid API key', status: 403 }),
        isTimedOut: false,
      }),
    });

    const request = {
      method: 'GET',
      path: '/test',
      queryParameters: {},
      headers: {},
    } as const;

    await expect(transporter.requestWithHttpInfo(request)).rejects.toThrow(new ApiError('Invalid API key', 403, []));
    await expect(transporter.request(request)).rejects.toThrow(new ApiError('Invalid API key', 403, []));
  });

  test('throws detailed errors when the response contains one', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 400,
        content: JSON.stringify({ message: 'Invalid request', status: 400, error: { code: 'invalid_request' } }),
        isTimedOut: false,
      }),
    });

    await expect(
      transporter.requestWithHttpInfo({
        method: 'GET',
        path: '/test',
        queryParameters: {},
        headers: {},
      }),
    ).rejects.toBeInstanceOf(DetailedApiError);
  });

  test('bypasses the requests and responses caches, even for cacheable requests', async () => {
    let requestCount = 0;
    const transporter = createTestTransporter({
      send: async () => {
        requestCount++;
        return {
          status: 200,
          content: JSON.stringify({ value: requestCount }),
          isTimedOut: false,
        };
      },
    });

    const request = {
      method: 'GET',
      path: '/test',
      queryParameters: {},
      headers: {},
      cacheable: true,
    } as const;

    const firstResponse = await transporter.requestWithHttpInfo<{ value: number }>(request);
    const secondResponse = await transporter.requestWithHttpInfo<{ value: number }>(request);

    // Each call hits the network, nothing is read from nor written to the caches
    expect(firstResponse.data).toEqual({ value: 1 });
    expect(secondResponse.data).toEqual({ value: 2 });
    expect(requestCount).toBe(2);

    // The plain `request` does not see cache entries created by `requestWithHttpInfo` either
    const cachedData = await transporter.request<{ value: number }>(request);
    expect(cachedData).toEqual({ value: 3 });
  });
});
