import { describe, expect, test } from 'vitest';
import { createMemoryCache, createNullCache } from '../../cache';
import { createNullLogger } from '../../logger';
import { ApiError, DeserializationError, DetailedApiError, RetryError, createTransporter } from '../../transporter';
import type { AlgoliaAgent, Requester, Transporter } from '../../types';

describe('correlation ID on errors', () => {
  const algoliaAgent: AlgoliaAgent = {
    value: 'test',
    add: () => algoliaAgent,
  };

  function createTestTransporter(requester: Requester, hostCount = 1): Transporter {
    return createTransporter({
      hosts: Array.from({ length: hostCount }, (_, i) => ({
        url: `localhost-${i}`,
        accept: 'readWrite',
        protocol: 'https',
      })),
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

  const request = {
    method: 'GET',
    path: '/test',
    queryParameters: {},
    headers: {},
  } as const;

  test('exposes the correlation ID on 4xx errors and appends it to the message', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 403,
        content: JSON.stringify({ message: 'Invalid API key', status: 403 }),
        headers: { 'correlation-id': 'abc123def45' },
        isTimedOut: false,
      }),
    });

    const error: ApiError = await transporter.request(request).then(
      () => Promise.reject(new Error('should have thrown')),
      (err) => err,
    );

    expect(error).toBeInstanceOf(ApiError);
    expect(error.correlationId).toBe('abc123def45');
    expect(error.message).toBe('Invalid API key (Correlation-ID: abc123def45)');
    expect(error.status).toBe(403);
  });

  test('leaves errors byte-identical to today when the header is absent', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 403,
        content: JSON.stringify({ message: 'Invalid API key', status: 403 }),
        headers: {},
        isTimedOut: false,
      }),
    });

    const error: ApiError = await transporter.request(request).then(
      () => Promise.reject(new Error('should have thrown')),
      (err) => err,
    );

    expect(error).toBeInstanceOf(ApiError);
    expect(error.correlationId).toBeUndefined();
    expect(error.message).toBe('Invalid API key');
  });

  test('reads the header case-insensitively from custom requesters', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 400,
        content: JSON.stringify({ message: 'Bad request', status: 400 }),
        headers: { 'Correlation-ID': 'abc123def45' },
        isTimedOut: false,
      }),
    });

    await expect(transporter.request(request)).rejects.toMatchObject({
      correlationId: 'abc123def45',
    });
  });

  test('threads the correlation ID through detailed errors', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 400,
        content: JSON.stringify({ message: 'Invalid request', status: 400, error: { code: 'invalid_request' } }),
        headers: { 'correlation-id': 'abc123def45' },
        isTimedOut: false,
      }),
    });

    const error: DetailedApiError = await transporter.request(request).then(
      () => Promise.reject(new Error('should have thrown')),
      (err) => err,
    );

    expect(error).toBeInstanceOf(DetailedApiError);
    expect(error.correlationId).toBe('abc123def45');
    expect(error.error).toEqual({ code: 'invalid_request' });
  });

  test('never reads the unrelated edge X-Algolia-RequestID header', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 403,
        content: JSON.stringify({ message: 'Invalid API key', status: 403 }),
        headers: { 'x-algolia-requestid': 'edge-pop-id' },
        isTimedOut: false,
      }),
    });

    const error: ApiError = await transporter.request(request).then(
      () => Promise.reject(new Error('should have thrown')),
      (err) => err,
    );

    expect(error.correlationId).toBeUndefined();
    expect(error.message).toBe('Invalid API key');
  });

  test('surfaces the last-seen correlation ID when all hosts are exhausted', async () => {
    let attempt = 0;
    const transporter = createTestTransporter(
      {
        send: async () => {
          attempt++;
          return {
            status: 500,
            content: JSON.stringify({ message: 'Internal error', status: 500 }),
            headers: { 'correlation-id': `cid-attempt-${attempt}` },
            isTimedOut: false,
          };
        },
      },
      2,
    );

    const error: RetryError = await transporter.request(request).then(
      () => Promise.reject(new Error('should have thrown')),
      (err) => err,
    );

    expect(error).toBeInstanceOf(RetryError);
    expect(attempt).toBe(2);
    expect(error.correlationId).toBe('cid-attempt-2');
    expect(error.message).toContain('Unreachable hosts');
    expect(error.message).toContain('(Correlation-ID: cid-attempt-2)');
  });

  test('carries no correlation ID when every attempt times out', async () => {
    const transporter = createTestTransporter(
      {
        send: async () => ({
          status: 0,
          content: '',
          isTimedOut: true,
        }),
      },
      2,
    );

    const error: RetryError = await transporter.request(request).then(
      () => Promise.reject(new Error('should have thrown')),
      (err) => err,
    );

    expect(error).toBeInstanceOf(RetryError);
    expect(error.correlationId).toBeUndefined();
    expect(error.message).not.toContain('Correlation-ID');
  });

  test('surfaces the correlation ID when a successful response body fails to parse', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 200,
        content: 'not json',
        headers: { 'correlation-id': 'abc123def45' },
        isTimedOut: false,
      }),
    });

    const error: DeserializationError = await transporter.request(request).then(
      () => Promise.reject(new Error('should have thrown')),
      (err) => err,
    );

    expect(error).toBeInstanceOf(DeserializationError);
    expect(error.correlationId).toBe('abc123def45');
    expect(error.message).toContain('(Correlation-ID: abc123def45)');
  });

  test('omits the correlation ID from a parse failure when the header is absent', async () => {
    const transporter = createTestTransporter({
      send: async () => ({
        status: 200,
        content: 'not json',
        headers: {},
        isTimedOut: false,
      }),
    });

    const error: DeserializationError = await transporter.request(request).then(
      () => Promise.reject(new Error('should have thrown')),
      (err) => err,
    );

    expect(error).toBeInstanceOf(DeserializationError);
    expect(error.correlationId).toBeUndefined();
    expect(error.message).not.toContain('Correlation-ID');
  });
});
