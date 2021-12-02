import { SearchApi, EchoRequester } from '@algolia/client-search';

describe('Common Test Suite', () => {
  const client = new SearchApi(
    process.env.ALGOLIA_APPLICATION_ID,
    process.env.ALGOLIA_SEARCH_KEY,
    { requester: new EchoRequester() }
  );

  test('search', async () => {
    const req = await client.search('indexName', { query: 'queryString' });
    expect(req).toMatchObject({
      path: '/1/indexes/indexName/query',
      method: 'POST',
      data: { query: 'queryString' },
    });
  });
});
