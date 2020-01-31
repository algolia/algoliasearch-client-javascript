import { anything, spy, verify, when } from 'ts-mockito';

import { TestSuite } from '../../../../client-common/src/__tests__/TestSuite';

const algoliasearch = new TestSuite().algoliasearch;

describe('search client', () => {
  it('gives access to appId', () => {
    expect(algoliasearch('appId', 'apiKey').appId).toEqual('appId');
  });
});

describe('multiple search for facet values', () => {
  it('allows to pass search params to the underlying search for facet values of index', async () => {
    const client = algoliasearch('appId', 'apiKey');
    const transporterMock = spy(client.transporter);
    when(transporterMock.read(anything(), anything())).thenResolve({});

    const query = {
      indexName: 'foo',
      params: {
        facetName: 'firstname',
        facetQuery: 'Jimmie',
        something: 'else',
      },
    };

    await client.searchForFacetValues([query, query]);

    verify(transporterMock.read(anything(), anything())).twice();
  });
});

test('get logs', async () => {
  const client = algoliasearch('appId', 'apiKey');
  const transporterMock = spy(client.transporter);
  when(transporterMock.read(anything(), anything())).thenResolve({});

  await client.getLogs();

  verify(transporterMock.read(anything(), undefined)).once();
});

test('clearCache', async () => {
  const client = algoliasearch('appId', 'apiKey');

  client.transporter.requestsCache.set('bla', 'blo');
  client.transporter.responsesCache.set('bla', 'blo');

  if (testing.isBrowser()) {
    await expect(
      client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('blo');
    await expect(
      client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('blo');
  } else {
    // node uses a null cache, so these assertions don't make sense there
    await expect(
      client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('wrong');
    await expect(
      client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('wrong');
  }

  await client.clearCache();

  await expect(
    client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
  ).resolves.toBe('wrong');
  await expect(
    client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
  ).resolves.toBe('wrong');
});

test('clearCache without promise', async () => {
  const client = algoliasearch('appId', 'apiKey');

  client.transporter.requestsCache.set('bla', 'blo');
  client.transporter.responsesCache.set('bla', 'blo');

  if (testing.isBrowser()) {
    await expect(
      client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('blo');
    await expect(
      client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('blo');
  } else {
    // node uses a null cache, so these assertions don't make sense there
    await expect(
      client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('wrong');
    await expect(
      client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('wrong');
  }

  // no await, since default memory caches _actually_ are instant
  client.clearCache();

  await expect(
    client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
  ).resolves.toBe('wrong');
  await expect(
    client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
  ).resolves.toBe('wrong');
});
