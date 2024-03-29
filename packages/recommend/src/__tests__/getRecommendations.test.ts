import { TestSuite } from '../../../client-common/src/__tests__/TestSuite';

const recommend = new TestSuite('recommend').recommend;

function createMockedClient<TObject>() {
  const client = recommend('appId', 'apiKey');
  jest.spyOn(client.transporter, 'read').mockImplementation(() =>
    Promise.resolve({
      results: [
        {
          hits: [
            {
              objectID: '1',
            },
          ],
        },
      ],
    })
  );

  return client;
}

describe('getRecommendations', () => {
  test('builds the request for "bought-together" model', async () => {
    const client = createMockedClient();

    await client.getRecommendations(
      [
        {
          model: 'bought-together',
          indexName: 'products',
          objectID: 'B018APC4LE',
        },
      ],
      {}
    );

    expect(client.transporter.read).toHaveBeenCalledTimes(1);
    expect(client.transporter.read).toHaveBeenCalledWith(
      {
        cacheable: true,
        data: {
          requests: [
            {
              indexName: 'products',
              model: 'bought-together',
              objectID: 'B018APC4LE',
              threshold: 0,
            },
          ],
        },
        method: 'POST',
        path: '1/indexes/*/recommendations',
      },
      {}
    );
  });

  test('builds the request for "related-products" model', async () => {
    const client = createMockedClient();

    await client.getRecommendations(
      [
        {
          model: 'related-products',
          indexName: 'products',
          objectID: 'B018APC4LE',
        },
      ],
      {}
    );

    expect(client.transporter.read).toHaveBeenCalledTimes(1);
    expect(client.transporter.read).toHaveBeenCalledWith(
      {
        cacheable: true,
        data: {
          requests: [
            {
              indexName: 'products',
              model: 'related-products',
              objectID: 'B018APC4LE',
              threshold: 0,
            },
          ],
        },
        method: 'POST',
        path: '1/indexes/*/recommendations',
      },
      {}
    );
  });

  test('builds multiple requests', async () => {
    const client = createMockedClient();

    await client.getRecommendations(
      [
        {
          model: 'related-products',
          indexName: 'products',
          objectID: 'B018APC4LE-1',
        },
        {
          model: 'related-products',
          indexName: 'products',
          objectID: 'B018APC4LE-2',
        },
      ],
      {}
    );

    expect(client.transporter.read).toHaveBeenCalledTimes(1);
    expect(client.transporter.read).toHaveBeenCalledWith(
      {
        cacheable: true,
        data: {
          requests: [
            {
              indexName: 'products',
              model: 'related-products',
              objectID: 'B018APC4LE-1',
              threshold: 0,
            },
            {
              indexName: 'products',
              model: 'related-products',
              objectID: 'B018APC4LE-2',
              threshold: 0,
            },
          ],
        },
        method: 'POST',
        path: '1/indexes/*/recommendations',
      },
      {}
    );
  });

  test('overrides `undefined` threshold with default value', async () => {
    const client = createMockedClient();

    await client.getRecommendations(
      [
        {
          model: 'bought-together',
          indexName: 'products',
          objectID: 'B018APC4LE',
          threshold: undefined,
        },
      ],
      {}
    );

    expect(client.transporter.read).toHaveBeenCalledTimes(1);
    expect(client.transporter.read).toHaveBeenCalledWith(
      {
        cacheable: true,
        data: {
          requests: [
            {
              indexName: 'products',
              model: 'bought-together',
              objectID: 'B018APC4LE',
              threshold: 0,
            },
          ],
        },
        method: 'POST',
        path: '1/indexes/*/recommendations',
      },
      {}
    );
  });

  test('overrides default threshold value', async () => {
    const client = createMockedClient();

    await client.getRecommendations(
      [
        {
          model: 'bought-together',
          indexName: 'products',
          objectID: 'B018APC4LE',
          threshold: 42,
        },
      ],
      {}
    );

    expect(client.transporter.read).toHaveBeenCalledTimes(1);
    expect(client.transporter.read).toHaveBeenCalledWith(
      {
        cacheable: true,
        data: {
          requests: [
            {
              indexName: 'products',
              model: 'bought-together',
              objectID: 'B018APC4LE',
              threshold: 42,
            },
          ],
        },
        method: 'POST',
        path: '1/indexes/*/recommendations',
      },
      {}
    );
  });

  test('returns recommendations results', async () => {
    const client = createMockedClient();

    const recommendations = await client.getRecommendations<any>(
      [
        {
          model: 'bought-together',
          indexName: 'products',
          objectID: 'B018APC4LE',
        },
      ],
      {}
    );

    expect(recommendations.results[0].hits).toEqual([
      {
        objectID: '1',
      },
    ]);
  });
});
