import { TestSuite } from '../../../client-common/src/__tests__/TestSuite';

const recommend = new TestSuite('recommend').recommend;

function createMockedClient() {
  const client = recommend('appId', 'apiKey');
  jest.spyOn(client.transporter, 'read').mockImplementation(() => Promise.resolve());

  return client;
}

describe('getFrequentlyBoughtTogether', () => {
  test('builds the request', async () => {
    const client = createMockedClient();

    await client.getFrequentlyBoughtTogether(
      [
        {
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
              fallbackParameters: {},
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

  test('ignores `fallbackParameters`', async () => {
    const client = createMockedClient();

    await client.getFrequentlyBoughtTogether([
      {
        // @ts-ignore `fallbackParameters` are not supposed to be passed
        // according to the types
        fallbackParameters: {
          facetFilters: [],
        },
        indexName: 'products',
        objectID: 'B018APC4LE',
      },
    ]);

    expect(client.transporter.read).toHaveBeenCalledTimes(1);
    expect(client.transporter.read).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          requests: [
            {
              fallbackParameters: {},
              indexName: 'products',
              model: 'bought-together',
              objectID: 'B018APC4LE',
              threshold: 0,
            },
          ],
        },
      }),
      undefined
    );
  });
});
