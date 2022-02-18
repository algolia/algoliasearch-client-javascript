import type { EchoResponse } from '@algolia/client-common';
import { sourcesApi } from '@algolia/client-sources';
import { echoRequester } from '@algolia/requester-node-http';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = sourcesApi(appId, apiKey, 'us', { requester: echoRequester() });

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
