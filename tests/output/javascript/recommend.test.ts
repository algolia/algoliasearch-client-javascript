import { RecommendApi, EchoRequester } from '@algolia/recommend';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new RecommendApi(appId, apiKey, {
  requester: new EchoRequester(),
});

describe('getRecommendations', () => {
  test('get recommendations with minimal parameters', async () => {
    const req = await client.getRecommendations({
      getRecommendations: {
        requests: [
          {
            indexName: 'indexName',
            objectID: 'objectID',
            model: 'related-products',
            threshold: 42,
          },
        ],
      },
    });

    expect((req as any).path).toEqual('/1/indexes/*/recommendations');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          indexName: 'indexName',
          objectID: 'objectID',
          model: 'related-products',
          threshold: 42,
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get recommendations with all parameters', async () => {
    const req = await client.getRecommendations({
      getRecommendations: {
        requests: [
          {
            indexName: 'indexName',
            objectID: 'objectID',
            model: 'related-products',
            threshold: 42,
            queryParameters: { query: 'myQuery', facetFilters: ['query'] },
            fallbackParameters: {
              query: 'myQuery',
              facetFilters: ['fallback'],
            },
          },
        ],
      },
    });

    expect((req as any).path).toEqual('/1/indexes/*/recommendations');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          indexName: 'indexName',
          objectID: 'objectID',
          model: 'related-products',
          threshold: 42,
          queryParameters: { query: 'myQuery', facetFilters: ['query'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback'] },
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get multiple recommendations with minimal parameters', async () => {
    const req = await client.getRecommendations({
      getRecommendations: {
        requests: [
          {
            indexName: 'indexName1',
            objectID: 'objectID1',
            model: 'related-products',
            threshold: 21,
          },
          {
            indexName: 'indexName2',
            objectID: 'objectID2',
            model: 'related-products',
            threshold: 21,
          },
        ],
      },
    });

    expect((req as any).path).toEqual('/1/indexes/*/recommendations');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'related-products',
          threshold: 21,
        },
        {
          indexName: 'indexName2',
          objectID: 'objectID2',
          model: 'related-products',
          threshold: 21,
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get multiple recommendations with all parameters', async () => {
    const req = await client.getRecommendations({
      getRecommendations: {
        requests: [
          {
            indexName: 'indexName1',
            objectID: 'objectID1',
            model: 'related-products',
            threshold: 21,
            queryParameters: { query: 'myQuery', facetFilters: ['query1'] },
            fallbackParameters: {
              query: 'myQuery',
              facetFilters: ['fallback1'],
            },
          },
          {
            indexName: 'indexName2',
            objectID: 'objectID2',
            model: 'related-products',
            threshold: 21,
            queryParameters: { query: 'myQuery', facetFilters: ['query2'] },
            fallbackParameters: {
              query: 'myQuery',
              facetFilters: ['fallback2'],
            },
          },
        ],
      },
    });

    expect((req as any).path).toEqual('/1/indexes/*/recommendations');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'related-products',
          threshold: 21,
          queryParameters: { query: 'myQuery', facetFilters: ['query1'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback1'] },
        },
        {
          indexName: 'indexName2',
          objectID: 'objectID2',
          model: 'related-products',
          threshold: 21,
          queryParameters: { query: 'myQuery', facetFilters: ['query2'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback2'] },
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });

  test('get frequently bought together recommendations', async () => {
    const req = await client.getRecommendations({
      getRecommendations: {
        requests: [
          {
            indexName: 'indexName1',
            objectID: 'objectID1',
            model: 'bought-together',
            threshold: 42,
          },
        ],
      },
    });

    expect((req as any).path).toEqual('/1/indexes/*/recommendations');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'bought-together',
          threshold: 42,
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});
