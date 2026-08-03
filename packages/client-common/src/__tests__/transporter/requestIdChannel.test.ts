import { describe, expect, test } from 'vitest';
import { createMemoryCache, createNullCache } from '../../cache';
import { createNullLogger } from '../../logger';
import { createTransporter } from '../../transporter';
import type { AlgoliaAgent, EndRequest, Requester, TransporterOptions, TransporterWithHttpInfo } from '../../types';

const REQUEST_ID_FORMAT = /^[0-9A-Za-z]{11}$/;

describe('request ID channel', () => {
  const algoliaAgent: AlgoliaAgent = {
    value: 'test',
    add: () => algoliaAgent,
  };

  function createTestTransporter(
    requester: Requester,
    options: Partial<TransporterOptions> = {},
  ): TransporterWithHttpInfo {
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
      requestsCache: createMemoryCache({ serializable: false }),
      responsesCache: createMemoryCache(),
      ...options,
    });
  }

  function createEchoRequester(): { requester: Requester; requests: EndRequest[] } {
    const requests: EndRequest[] = [];

    return {
      requests,
      requester: {
        send: async (endRequest) => {
          requests.push(endRequest);
          return { status: 200, content: '{}', isTimedOut: false };
        },
      },
    };
  }

  function sentQueryParameterId(endRequest: EndRequest): string | null {
    return new URL(endRequest.url).searchParams.get('x-algolia-request-id');
  }

  const request = {
    method: 'GET',
    path: '/test',
    queryParameters: {},
    headers: {},
  } as const;

  test('sends no request ID when no channel is configured', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester);

    await transporter.request(request);

    expect(requests[0].headers['request-id']).toBeUndefined();
    expect(sentQueryParameterId(requests[0])).toBeNull();
  });

  test('sends the request ID as a header on the headers channel', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'headers' });

    await transporter.request(request);

    expect(requests[0].headers['request-id']).toMatch(REQUEST_ID_FORMAT);
    expect(sentQueryParameterId(requests[0])).toBeNull();
  });

  test('sends the request ID as a query parameter on the queryParameters channel', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'queryParameters' });

    await transporter.request(request);

    expect(sentQueryParameterId(requests[0])).toMatch(REQUEST_ID_FORMAT);
    expect(requests[0].headers['request-id']).toBeUndefined();
  });

  test('reuses the ID across retry attempts and mints a fresh one per call', async () => {
    const requests: EndRequest[] = [];
    let sendCount = 0;
    const requester: Requester = {
      send: async (endRequest) => {
        requests.push(endRequest);
        sendCount++;
        if (sendCount === 1) {
          return { status: 500, content: JSON.stringify({ message: 'error', status: 500 }), isTimedOut: false };
        }
        return { status: 200, content: '{}', isTimedOut: false };
      },
    };
    const transporter = createTestTransporter(requester, {
      hosts: [
        { url: 'localhost-1', accept: 'readWrite', protocol: 'https' },
        { url: 'localhost-2', accept: 'readWrite', protocol: 'https' },
      ],
      requestIdChannel: 'headers',
    });

    await transporter.request(request);

    expect(requests).toHaveLength(2);
    const firstCallId = requests[0].headers['request-id'];
    expect(firstCallId).toMatch(REQUEST_ID_FORMAT);
    expect(requests[1].headers['request-id']).toBe(firstCallId);

    await transporter.request(request);

    expect(requests).toHaveLength(3);
    expect(requests[2].headers['request-id']).toMatch(REQUEST_ID_FORMAT);
    expect(requests[2].headers['request-id']).not.toBe(firstCallId);
  });

  test('preserves a caller-supplied Request-ID header', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'headers' });

    await transporter.request(request, { headers: { 'Request-ID': 'callerSuppl1' } });

    expect(requests[0].headers['request-id']).toBe('callerSuppl1');
  });

  test('never mints when the caller supplied a header, even on the queryParameters channel', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'queryParameters' });

    await transporter.request(request, { headers: { 'Request-ID': 'callerSuppl1' } });

    expect(requests[0].headers['request-id']).toBe('callerSuppl1');
    expect(sentQueryParameterId(requests[0])).toBeNull();
  });

  test('preserves a caller-supplied x-algolia-request-id query parameter', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'queryParameters' });

    await transporter.request(request, { queryParameters: { 'x-algolia-request-id': 'callerSuppl1' } });

    expect(sentQueryParameterId(requests[0])).toBe('callerSuppl1');
    expect(requests[0].headers['request-id']).toBeUndefined();
  });

  test('never mints when the caller supplied a query parameter, even on the headers channel', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'headers' });

    await transporter.request(request, { queryParameters: { 'x-algolia-request-id': 'callerSuppl1' } });

    expect(requests[0].headers['request-id']).toBeUndefined();
    expect(sentQueryParameterId(requests[0])).toBe('callerSuppl1');
  });

  test('detects a caller-supplied query parameter case-insensitively on the headers channel', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'headers' });

    await transporter.request(request, { queryParameters: { 'X-Algolia-Request-Id': 'callerSuppl1' } });

    expect(requests[0].headers['request-id']).toBeUndefined();
  });

  test('leaves the cache key unchanged so cacheable calls still hit the cache', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'queryParameters' });
    const cacheableRequest = { ...request, cacheable: true };

    await transporter.request(cacheableRequest);
    await transporter.request(cacheableRequest);

    expect(requests).toHaveLength(1);
  });

  test('shares one wire request and one ID between deduplicated concurrent calls', async () => {
    const requests: EndRequest[] = [];
    const requester: Requester = {
      send: async (endRequest) => {
        requests.push(endRequest);
        await new Promise((resolve) => setTimeout(resolve, 10));
        return { status: 200, content: '{}', isTimedOut: false };
      },
    };
    const transporter = createTestTransporter(requester, { requestIdChannel: 'headers' });
    const cacheableRequest = { ...request, cacheable: true };

    await Promise.all([transporter.request(cacheableRequest), transporter.request(cacheableRequest)]);

    expect(requests).toHaveLength(1);
    expect(requests[0].headers['request-id']).toMatch(REQUEST_ID_FORMAT);
  });

  test('sends the request ID on requestWithHttpInfo', async () => {
    const { requester, requests } = createEchoRequester();
    const transporter = createTestTransporter(requester, { requestIdChannel: 'headers' });

    await transporter.requestWithHttpInfo(request);

    expect(requests[0].headers['request-id']).toMatch(REQUEST_ID_FORMAT);
  });

  test('sends the request ID on streamed requests', async () => {
    const requests: EndRequest[] = [];
    const requester: Requester = {
      send: async () => ({ status: 200, content: '{}', isTimedOut: false }),
      sendStream: async (endRequest) => {
        requests.push(endRequest);
        return new ReadableStream<Uint8Array>({
          start(controller) {
            controller.close();
          },
        });
      },
    };
    const transporter = createTestTransporter(requester, { requestIdChannel: 'headers' });

    await transporter.requestStream(request).next();

    expect(requests[0].headers['request-id']).toMatch(REQUEST_ID_FORMAT);
  });
});
