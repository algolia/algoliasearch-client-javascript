import { expect, test, vi } from 'vitest';

import type { EndRequest, Requester } from '../../client-common/src/types';
import { LogLevelEnum } from '../../client-common/src/types';
import { createConsoleLogger } from '../../logger-console/src/logger';
import { algoliasearch, apiClientVersion } from '../builds/node';

test('sets the ua', () => {
  const client = algoliasearch('APP_ID', 'API_KEY');
  expect(client.transporter.algoliaAgent).toEqual({
    add: expect.any(Function),
    value: expect.stringContaining(
      `Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion}); Node.js`,
    ),
  });
});

test('forwards node search helpers', () => {
  const client = algoliasearch('APP_ID', 'API_KEY');
  expect(client.generateSecuredApiKey).not.toBeUndefined();
  expect(client.getSecuredApiKeyRemainingValidity).not.toBeUndefined();
  expect(() => {
    const resp = client.generateSecuredApiKey({ parentApiKey: 'foo', restrictions: { validUntil: 200 } });
    client.getSecuredApiKeyRemainingValidity({ securedApiKey: resp });
  }).not.toThrow();
});

function createRecordingRequester(): { requester: Requester; requests: EndRequest[] } {
  const requests: EndRequest[] = [];

  return {
    requests,
    requester: {
      send(request: EndRequest) {
        requests.push(request);
        let content = JSON.stringify({ taskID: 42, objectIDs: [], updatedAt: '2026-01-01T00:00:00Z' });
        if (request.url.includes('/task/')) {
          content = JSON.stringify({ status: 'published', updatedAt: '2026-01-01T00:00:00Z' });
        } else if (request.url.includes('/push/')) {
          content = JSON.stringify({ runID: 'run-1', eventID: 'event-1', message: 'pushed' });
        } else if (request.url.includes('/events/')) {
          content = JSON.stringify({
            eventID: 'event-1',
            runID: 'run-1',
            status: 'succeeded',
            type: 'record',
            batchSize: 1,
            publishedAt: '2026-01-01T00:00:00Z',
          });
        }

        return Promise.resolve({ content, isTimedOut: false, status: 200 });
      },
    },
  };
}

test('chunkedBatch shares one request-id across its batch calls and task polls', async () => {
  const { requester, requests } = createRecordingRequester();
  const client = algoliasearch('APP_ID', 'API_KEY', { requester });
  const objects = Array.from({ length: 1500 }, (_, i) => ({ objectID: `${i}` }));

  await client.chunkedBatch({ indexName: 'foo', objects, waitForTasks: true });

  expect(requests).toHaveLength(4);
  const ids = requests.map((request) => request.headers['request-id']);
  expect(ids[0]).toMatch(/^[0-9A-Za-z]{11}$/);
  expect(new Set(ids).size).toBe(1);
});

test('replaceAllObjects shares one request-id across copy, batch, wait and move', async () => {
  const { requester, requests } = createRecordingRequester();
  const client = algoliasearch('APP_ID', 'API_KEY', { requester });

  await client.replaceAllObjects({ indexName: 'foo', objects: [{ objectID: '1' }] });

  expect(requests).toHaveLength(8);
  const ids = requests.map((request) => request.headers['request-id']);
  expect(ids[0]).toMatch(/^[0-9A-Za-z]{11}$/);
  expect(new Set(ids).size).toBe(1);
});

test('replaceAllObjectsWithTransformation shares one request-id across its search calls and sends none to ingestion', async () => {
  const { requester, requests } = createRecordingRequester();
  const client = algoliasearch('APP_ID', 'API_KEY', {
    requester,
    transformationOptions: { region: 'eu', requester },
  });

  await client.replaceAllObjectsWithTransformation({ indexName: 'foo', objects: [{ objectID: '1' }] });

  const searchRequests = requests.filter((request) => request.url.includes('algolia.net'));
  const ingestionRequests = requests.filter((request) => request.url.includes('data.eu.algolia.com'));

  expect(requests).toHaveLength(8);
  expect(searchRequests).toHaveLength(6);
  expect(ingestionRequests).toHaveLength(2);

  const searchIds = searchRequests.map((request) => request.headers['request-id']);
  expect(searchIds[0]).toMatch(/^[0-9A-Za-z]{11}$/);
  expect(new Set(searchIds).size).toBe(1);

  for (const request of ingestionRequests) {
    expect(request.headers['request-id']).toBeUndefined();
    expect(new URL(request.url).searchParams.get('x-algolia-request-id')).toBeNull();
  }
});

test('each helper invocation mints a fresh request-id', async () => {
  const { requester, requests } = createRecordingRequester();
  const client = algoliasearch('APP_ID', 'API_KEY', { requester });

  await client.chunkedBatch({ indexName: 'foo', objects: [{ objectID: '1' }] });
  await client.chunkedBatch({ indexName: 'foo', objects: [{ objectID: '1' }] });

  expect(requests).toHaveLength(2);
  expect(requests[0].headers['request-id']).not.toBe(requests[1].headers['request-id']);
});

test('a caller-supplied request-id flows through helpers untouched', async () => {
  const { requester, requests } = createRecordingRequester();
  const client = algoliasearch('APP_ID', 'API_KEY', { requester });

  await client.chunkedBatch(
    { indexName: 'foo', objects: [{ objectID: '1' }], waitForTasks: true },
    { headers: { 'request-id': 'CallerChose' } },
  );

  expect(requests).toHaveLength(2);
  expect(requests.map((request) => request.headers['request-id'])).toEqual(['CallerChose', 'CallerChose']);
});

test('with logger', async () => {
  const consoleInfo = vi.spyOn(console, 'info').mockImplementation(() => {});

  const client = algoliasearch('APP_ID', 'API_KEY', {
    logger: createConsoleLogger(LogLevelEnum.Debug),
    // every host fails, exercising the retry logging path without a real request that could outlive the test
    requester: {
      send: () => Promise.resolve({ content: 'internal error', isTimedOut: false, status: 500 }),
    },
  });

  await expect(client.setSettings({ indexName: 'foo', indexSettings: {} })).rejects.toThrow();

  expect(consoleInfo).toHaveBeenCalledWith('Retryable failure', expect.any(Object));
});
