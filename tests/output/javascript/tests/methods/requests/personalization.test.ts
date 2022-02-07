import { EchoRequester } from '@algolia/client-common';
import type { EchoResponse } from '@algolia/client-common';
import { personalizationApi } from '@algolia/client-personalization';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = personalizationApi(appId, apiKey, 'us', {
  requester: new EchoRequester(),
});

describe('deleteUserProfile', () => {
  test('delete deleteUserProfile', async () => {
    const req = (await client.deleteUserProfile({
      userToken: 'UserToken',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/profiles/UserToken');
    expect(req.method).toEqual('DELETE');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('getPersonalizationStrategy', () => {
  test('get getPersonalizationStrategy', async () => {
    const req =
      (await client.getPersonalizationStrategy()) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/strategies/personalization');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('getUserTokenProfile', () => {
  test('get getUserTokenProfile', async () => {
    const req = (await client.getUserTokenProfile({
      userToken: 'UserToken',
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/profiles/personalization/UserToken');
    expect(req.method).toEqual('GET');
    expect(req.data).toEqual(undefined);
    expect(req.searchParams).toEqual(undefined);
  });
});

describe('setPersonalizationStrategy', () => {
  test('set setPersonalizationStrategy', async () => {
    const req = (await client.setPersonalizationStrategy({
      eventScoring: [{ score: 42, eventName: 'Algolia', eventType: 'Event' }],
      facetScoring: [{ score: 42, facetName: 'Event' }],
      personalizationImpact: 42,
    })) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/strategies/personalization');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      eventScoring: [{ score: 42, eventName: 'Algolia', eventType: 'Event' }],
      facetScoring: [{ score: 42, facetName: 'Event' }],
      personalizationImpact: 42,
    });
    expect(req.searchParams).toEqual(undefined);
  });
});
