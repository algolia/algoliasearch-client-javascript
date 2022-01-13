import { InsightsApi, EchoRequester } from '@algolia/client-insights';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new InsightsApi(appId, apiKey, {
  requester: new EchoRequester(),
});

describe('pushEvents', () => {
  test('pushEvents', async () => {
    const req = await client.pushEvents({
      events: [
        {
          eventType: 'click',
          eventName: 'Product Clicked',
          index: 'products',
          userToken: 'user-123456',
          timestamp: 1641290601962,
          objectIDs: ['9780545139700', '9780439784542'],
          queryID: '43b15df305339e827f0ac0bdc5ebcaa7',
          positions: [7, 6],
        },
        {
          eventType: 'view',
          eventName: 'Product Detail Page Viewed',
          index: 'products',
          userToken: 'user-123456',
          timestamp: 1641290601962,
          objectIDs: ['9780545139700', '9780439784542'],
        },
        {
          eventType: 'conversion',
          eventName: 'Product Purchased',
          index: 'products',
          userToken: 'user-123456',
          timestamp: 1641290601962,
          objectIDs: ['9780545139700', '9780439784542'],
          queryID: '43b15df305339e827f0ac0bdc5ebcaa7',
        },
      ],
    });

    expect((req as any).path).toEqual('/1/events');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      events: [
        {
          eventType: 'click',
          eventName: 'Product Clicked',
          index: 'products',
          userToken: 'user-123456',
          timestamp: 1641290601962,
          objectIDs: ['9780545139700', '9780439784542'],
          queryID: '43b15df305339e827f0ac0bdc5ebcaa7',
          positions: [7, 6],
        },
        {
          eventType: 'view',
          eventName: 'Product Detail Page Viewed',
          index: 'products',
          userToken: 'user-123456',
          timestamp: 1641290601962,
          objectIDs: ['9780545139700', '9780439784542'],
        },
        {
          eventType: 'conversion',
          eventName: 'Product Purchased',
          index: 'products',
          userToken: 'user-123456',
          timestamp: 1641290601962,
          objectIDs: ['9780545139700', '9780439784542'],
          queryID: '43b15df305339e827f0ac0bdc5ebcaa7',
        },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});
