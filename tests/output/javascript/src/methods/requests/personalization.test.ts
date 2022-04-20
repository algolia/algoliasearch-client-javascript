import type { EchoResponse } from '@experimental-api-clients-automation/client-common';
import { personalizationClient } from '@experimental-api-clients-automation/client-personalization';
import { echoRequester } from '@experimental-api-clients-automation/requester-node-http';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'test_app_id';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'test_api_key';

const client = personalizationClient(appId, apiKey, 'us', {
  requester: echoRequester(),
});

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
