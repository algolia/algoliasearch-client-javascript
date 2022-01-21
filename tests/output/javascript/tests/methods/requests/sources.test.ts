import { SourcesApi, EchoRequester } from '@algolia/client-sources';
import type { EchoResponse } from '@algolia/client-sources';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new SourcesApi(appId, apiKey, 'us', {
  requester: new EchoRequester(),
});

describe('postIngestUrl', () => {
  test('post postIngestUrl with minimal parameters', async () => {
    const req = (await client.postIngestUrl({
      type: 'csv',
      input: { url: 'https://example.com/file.csv' },
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/ingest/url');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      type: 'csv',
      input: { url: 'https://example.com/file.csv' },
    });
    expect(req.searchParams).toEqual(undefined);
  });
});
