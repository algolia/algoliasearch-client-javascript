import type { EchoResponse } from '@algolia/client-common';
import { recommendApi } from '@algolia/recommend';
import { echoRequester } from '@algolia/requester-node-http';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = recommendApi(appId, apiKey, { requester: echoRequester() });

describe('getRecommendations', () => {
  test('get recommendations for recommend model with minimal parameters', async () => {
    const req = (await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName',
          objectID: 'objectID',
          model: 'related-products',
          threshold: 42,
        },
      ],
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/recommendations');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [
        {
          indexName: 'indexName',
          objectID: 'objectID',
          model: 'related-products',
          threshold: 42,
        },
      ],
    });
    expect(req.searchParams).toEqual(undefined);
  });

  test('get recommendations for recommend model with all parameters', async () => {
    const req = (await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName',
          objectID: 'objectID',
          model: 'related-products',
          threshold: 42,
          maxRecommendations: 10,
          queryParameters: { query: 'myQuery', facetFilters: ['query'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback'] },
        },
      ],
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/recommendations');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [
        {
          indexName: 'indexName',
          objectID: 'objectID',
          model: 'related-products',
          threshold: 42,
          maxRecommendations: 10,
          queryParameters: { query: 'myQuery', facetFilters: ['query'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback'] },
        },
      ],
    });
    expect(req.searchParams).toEqual(undefined);
  });

  test('get recommendations for trending model with minimal parameters', async () => {
    const req = (await client.getRecommendations({
      requests: [
        { indexName: 'indexName', model: 'trending-items', threshold: 42 },
      ],
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/recommendations');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [
        { indexName: 'indexName', model: 'trending-items', threshold: 42 },
      ],
    });
    expect(req.searchParams).toEqual(undefined);
  });

  test('get recommendations for trending model with all parameters', async () => {
    const req = (await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName',
          model: 'trending-items',
          threshold: 42,
          maxRecommendations: 10,
          facetName: 'myFacetName',
          facetValue: 'myFacetValue',
          queryParameters: { query: 'myQuery', facetFilters: ['query'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback'] },
        },
      ],
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/recommendations');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [
        {
          indexName: 'indexName',
          model: 'trending-items',
          threshold: 42,
          maxRecommendations: 10,
          facetName: 'myFacetName',
          facetValue: 'myFacetValue',
          queryParameters: { query: 'myQuery', facetFilters: ['query'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback'] },
        },
      ],
    });
    expect(req.searchParams).toEqual(undefined);
  });

  test('get multiple recommendations with minimal parameters', async () => {
    const req = (await client.getRecommendations({
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
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/recommendations');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
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
    expect(req.searchParams).toEqual(undefined);
  });

  test('get multiple recommendations with all parameters', async () => {
    const req = (await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'related-products',
          threshold: 21,
          maxRecommendations: 10,
          queryParameters: { query: 'myQuery', facetFilters: ['query1'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback1'] },
        },
        {
          indexName: 'indexName2',
          objectID: 'objectID2',
          model: 'related-products',
          threshold: 21,
          maxRecommendations: 10,
          queryParameters: { query: 'myQuery', facetFilters: ['query2'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback2'] },
        },
      ],
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/recommendations');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'related-products',
          threshold: 21,
          maxRecommendations: 10,
          queryParameters: { query: 'myQuery', facetFilters: ['query1'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback1'] },
        },
        {
          indexName: 'indexName2',
          objectID: 'objectID2',
          model: 'related-products',
          threshold: 21,
          maxRecommendations: 10,
          queryParameters: { query: 'myQuery', facetFilters: ['query2'] },
          fallbackParameters: { query: 'myQuery', facetFilters: ['fallback2'] },
        },
      ],
    });
    expect(req.searchParams).toEqual(undefined);
  });

  test('get frequently bought together recommendations', async () => {
    const req = (await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'bought-together',
          threshold: 42,
        },
      ],
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/recommendations');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'bought-together',
          threshold: 42,
        },
      ],
    });
    expect(req.searchParams).toEqual(undefined);
  });
});
