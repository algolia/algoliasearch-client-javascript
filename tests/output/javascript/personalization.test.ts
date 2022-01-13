import {
  PersonalizationApi,
  EchoRequester,
} from '@algolia/client-personalization';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = new PersonalizationApi(appId, apiKey, 'us', {
  requester: new EchoRequester(),
});

describe('deleteUserProfile', () => {
  test('delete deleteUserProfile', async () => {
    const req = await client.deleteUserProfile({
      userToken: 'UserToken',
    });

    expect((req as any).path).toEqual('/1/profiles/UserToken');
    expect((req as any).method).toEqual('DELETE');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getPersonalizationStrategy', () => {
  test('get getPersonalizationStrategy', async () => {
    const req = await client.getPersonalizationStrategy();

    expect((req as any).path).toEqual('/1/strategies/personalization');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('getUserTokenProfile', () => {
  test('get getUserTokenProfile', async () => {
    const req = await client.getUserTokenProfile({
      userToken: 'UserToken',
    });

    expect((req as any).path).toEqual('/1/profiles/personalization/UserToken');
    expect((req as any).method).toEqual('GET');
    expect((req as any).data).toEqual(undefined);
    expect((req as any).searchParams).toEqual(undefined);
  });
});

describe('setPersonalizationStrategy', () => {
  test('set setPersonalizationStrategy', async () => {
    const req = await client.setPersonalizationStrategy({
      eventScoring: [{ score: 42, eventName: 'Algolia', eventType: 'Event' }],
      facetScoring: [{ score: 42, facetName: 'Event' }],
      personalizationImpact: 42,
    });

    expect((req as any).path).toEqual('/1/strategies/personalization');
    expect((req as any).method).toEqual('POST');
    expect((req as any).data).toEqual({
      eventScoring: [{ score: 42, eventName: 'Algolia', eventType: 'Event' }],
      facetScoring: [{ score: 42, facetName: 'Event' }],
      personalizationImpact: 42,
    });
    expect((req as any).searchParams).toEqual(undefined);
  });
});
