import type { EchoResponse } from '@experimental-api-clients-automation/client-common';
import { recommendApi } from '@experimental-api-clients-automation/recommend';
import { echoRequester } from '@experimental-api-clients-automation/requester-node-http';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = recommendApi(appId, apiKey, { requester: echoRequester() });

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
