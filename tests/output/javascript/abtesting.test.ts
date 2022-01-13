import { AbtestingApi, EchoRequester } from '@algolia/client-abtesting';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new AbtestingApi(appId, apiKey, 'us', {
  requester: new EchoRequester(),
});

describe('addABTests', () => {
  test('addABTests with minimal parameters', async () => {
    const req = await client.addABTests({
      endAt: new Date('2022-12-31'),
      name: 'myABTest',
      variant: [
        { index: 'AB_TEST_1', trafficPercentage: 30 },
        { index: 'AB_TEST_2', trafficPercentage: 50 },
      ],
    });

    expect((req as any).path).toEqual('/2/abtests');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      endAt: '2022-12-31T00:00:00.000Z',
      name: 'myABTest',
      variant: [
        { index: 'AB_TEST_1', trafficPercentage: 30 },
        { index: 'AB_TEST_2', trafficPercentage: 50 },
      ],
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('deleteABTest', () => {
  test('deleteABTest', async () => {
    const req = await client.deleteABTest({
      id: 42,
    });

    expect((req as any).path).toEqual('/2/abtests/42');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getABTest', () => {
  test('getABTest', async () => {
    const req = await client.getABTest({
      id: 42,
    });

    expect((req as any).path).toEqual('/2/abtests/42');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('listABTests', () => {
  test('listABTests with minimal parameters', async () => {
    const req = await client.listABTests({
      offset: 42,
      limit: 21,
    });

    expect((req as any).path).toEqual('/2/abtests');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual({ offset: '42', limit: '21' });
  });
});

describe('stopABTest', () => {
  test('stopABTest', async () => {
    const req = await client.stopABTest({
      id: 42,
    });

    expect((req as any).path).toEqual('/2/abtests/42/stop');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});
