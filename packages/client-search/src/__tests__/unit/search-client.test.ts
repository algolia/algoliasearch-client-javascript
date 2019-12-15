import { TestSuite } from '@algolia/client-common/src/__tests__/TestSuite';
import { createMappedRequestOptions } from '@algolia/transporter';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

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

  verify(transporterMock.read(anything(), deepEqual(createMappedRequestOptions(undefined)))).once();
});
