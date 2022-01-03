// @ts-nocheck
import { RecommendApi, EchoRequester } from '@algolia/recommend';

const client = new RecommendApi(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_SEARCH_KEY,
  { requester: new EchoRequester() }
);

describe('getRecommendations', () => {
  test('get recommendations with minimal parameters', async () => {
    const req = await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName',
          objectID: 'objectID',
          model: 'related-products',
          threshold: 42,
        },
      ],
    });
    expect(req).toMatchObject({
      path: '/1/indexes/*/recommendations',
      method: 'POST',
      data: {
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
  });

  test('get recommendations with all parameters', async () => {
    const req = await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName',
          objectID: 'objectID',
          model: 'related-products',
          threshold: 42,
          queryParameters: { facetFilters: ['query'] },
          fallbackParameters: { facetFilters: ['fallback'] },
        },
      ],
    });
    expect(req).toMatchObject({
      path: '/1/indexes/*/recommendations',
      method: 'POST',
      data: {
        requests: [
          {
            indexName: 'indexName',
            objectID: 'objectID',
            model: 'related-products',
            threshold: 42,
            queryParameters: { facetFilters: ['query'] },
            fallbackParameters: { facetFilters: ['fallback'] },
          },
        ],
      },
    });
  });

  test('get multiple recommendations with minimal parameters', async () => {
    const req = await client.getRecommendations({
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
    expect(req).toMatchObject({
      path: '/1/indexes/*/recommendations',
      method: 'POST',
      data: {
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
  });

  test('get multiple recommendations with all parameters', async () => {
    const req = await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'related-products',
          threshold: 21,
          queryParameters: { facetFilters: ['query1'] },
          fallbackParameters: { facetFilters: ['fallback1'] },
        },
        {
          indexName: 'indexName2',
          objectID: 'objectID2',
          model: 'related-products',
          threshold: 21,
          queryParameters: { facetFilters: ['query2'] },
          fallbackParameters: { facetFilters: ['fallback2'] },
        },
      ],
    });
    expect(req).toMatchObject({
      path: '/1/indexes/*/recommendations',
      method: 'POST',
      data: {
        requests: [
          {
            indexName: 'indexName1',
            objectID: 'objectID1',
            model: 'related-products',
            threshold: 21,
            queryParameters: { facetFilters: ['query1'] },
            fallbackParameters: { facetFilters: ['fallback1'] },
          },
          {
            indexName: 'indexName2',
            objectID: 'objectID2',
            model: 'related-products',
            threshold: 21,
            queryParameters: { facetFilters: ['query2'] },
            fallbackParameters: { facetFilters: ['fallback2'] },
          },
        ],
      },
    });
  });

  test('get frequently bought together recommendations', async () => {
    const req = await client.getRecommendations({
      requests: [
        {
          indexName: 'indexName1',
          objectID: 'objectID1',
          model: 'bought-together',
          threshold: 42,
        },
      ],
    });
    expect(req).toMatchObject({
      path: '/1/indexes/*/recommendations',
      method: 'POST',
      data: {
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
  });
});
