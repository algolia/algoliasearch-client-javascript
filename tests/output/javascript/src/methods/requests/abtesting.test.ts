import { abtestingApi } from '@algolia/client-abtesting';
import { EchoRequester } from '@algolia/client-common';
import type { EchoResponse } from '@algolia/client-common';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = abtestingApi(appId, apiKey, 'us', {
  requester: new EchoRequester(),
});

describe('addABTests', () => {
  test('addABTests with minimal parameters', async () => {
    const req = (await client.addABTests({
      endAt: '2022-12-31T00:00:00.000Z',
      name: 'myABTest',
      variant: [
        { index: 'AB_TEST_1', trafficPercentage: 30 },
        { index: 'AB_TEST_2', trafficPercentage: 50 },
      ],
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/abtests');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      endAt: '2022-12-31T00:00:00.000Z',
      name: 'myABTest',
      variant: [
        { index: 'AB_TEST_1', trafficPercentage: 30 },
        { index: 'AB_TEST_2', trafficPercentage: 50 },
      ],
    });
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('deleteABTest', () => {
  test('deleteABTest', async () => {
    const req = (await client.deleteABTest({
      id: 42,
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/abtests/42');
    expect(req.method).toEqual('DELETE');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('getABTest', () => {
  test('getABTest', async () => {
    const req = (await client.getABTest({ id: 42 })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/abtests/42');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('listABTests', () => {
  test('listABTests with minimal parameters', async () => {
    const req = (await client.listABTests({
      offset: 42,
      limit: 21,
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/abtests');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual({ offset: '42', limit: '21' });
  });
});

describe('stopABTest', () => {
  test('stopABTest', async () => {
    const req = (await client.stopABTest({
      id: 42,
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/2/abtests/42/stop');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});
