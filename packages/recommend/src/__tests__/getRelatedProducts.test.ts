import { TestSuite } from '../../../client-common/src/__tests__/TestSuite';

const recommend = new TestSuite('recommend').recommend;

function createMockedClient() {
  const client = recommend('appId', 'apiKey');
  jest.spyOn(client.transporter, 'read').mockImplementation(() => Promise.resolve());

  return client;
}

describe('getRelatedProducts', () => {
  test('builds the request', async () => {
    const client = createMockedClient();

    await client.getRelatedProducts(
      {
        indexName: 'products',
        objectID: 'B018APC4LE',
      },
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
});
