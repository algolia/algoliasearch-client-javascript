import type { EchoResponse } from '@experimental-api-clients-automation/client-common';
import { sourcesClient } from '@experimental-api-clients-automation/client-sources';
import { echoRequester } from '@experimental-api-clients-automation/requester-node-http';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = sourcesClient(appId, apiKey, 'us', {
  requester: echoRequester(),
});

describe('del', () => {
  test('allow del method for a custom path with minimal parameters', async () => {
    const req = (await client.del({
      path: '/test/minimal',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/minimal');
    expect(req.method).toEqual('DELETE');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });

  test('allow del method for a custom path with all parameters', async () => {
    const req = (await client.del({
      path: '/test/all',
      parameters: { query: 'parameters' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/all');
    expect(req.method).toEqual('DELETE');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ query: 'parameters' });
  });
});

describe('get', () => {
  test('allow get method for a custom path with minimal parameters', async () => {
    const req = (await client.get({
      path: '/test/minimal',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/minimal');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });

  test('allow get method for a custom path with all parameters', async () => {
    const req = (await client.get({
      path: '/test/all',
      parameters: { query: 'parameters' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/all');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ query: 'parameters' });
  });
});

describe('post', () => {
  test('allow post method for a custom path with minimal parameters', async () => {
    const req = (await client.post({
      path: '/test/minimal',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/minimal');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });

  test('allow post method for a custom path with all parameters', async () => {
    const req = (await client.post({
      path: '/test/all',
      parameters: { query: 'parameters' },
      body: { body: 'parameters' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/all');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({ body: 'parameters' });
    expect(req.searchParams).toEqual({ query: 'parameters' });
  });
});

describe('postIngestUrl', () => {
  test('post postIngestUrl with minimal parameters', async () => {
    const req = (await client.postIngestUrl({
      type: 'csv',
      input: { url: 'https://example.com/file.csv' },
      target: { type: 'search', indexName: 'pageviews', operation: 'replace' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/ingest/url');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      type: 'csv',
      input: { url: 'https://example.com/file.csv' },
      target: { type: 'search', indexName: 'pageviews', operation: 'replace' },
    });
    expect(req.searchParams).toEqual(undefined);
  });

  test('post postIngestUrl with all parameters', async () => {
    const req = (await client.postIngestUrl({
      type: 'csv',
      uniqueIDColumn: 'foobar',
      input: {
        url: 'https://example.com/file.csv',
        method: 'POST',
        auth: { type: 'basic', login: 'johndoe', password: 'password' },
      },
      target: { type: 'search', indexName: 'pageviews', operation: 'replace' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/ingest/url');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      type: 'csv',
      uniqueIDColumn: 'foobar',
      input: {
        url: 'https://example.com/file.csv',
        method: 'POST',
        auth: { type: 'basic', login: 'johndoe', password: 'password' },
      },
      target: { type: 'search', indexName: 'pageviews', operation: 'replace' },
    });
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('put', () => {
  test('allow put method for a custom path with minimal parameters', async () => {
    const req = (await client.put({
      path: '/test/minimal',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/minimal');
    expect(req.method).toEqual('PUT');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });

  test('allow put method for a custom path with all parameters', async () => {
    const req = (await client.put({
      path: '/test/all',
      parameters: { query: 'parameters' },
      body: { body: 'parameters' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/test/all');
    expect(req.method).toEqual('PUT');
    expect(req.data).toEqual({ body: 'parameters' });
    expect(req.searchParams).toEqual({ query: 'parameters' });
  });
});
