import { TestSuite } from '@algolia/client-common/src/__tests__/TestSuite';
import { MethodEnum } from '@algolia/requester-common';
import { mapRequestOptions } from '@algolia/transporter';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

const algoliasearch = new TestSuite().algoliasearch;

describe('search client', () => {
  it('gives access to appId', () => {
    expect(algoliasearch('appId', 'apiKey').appId).toEqual('appId');
  });
});

describe('personalization', () => {
  const client = algoliasearch('appId', 'apiKey');
  const transporterMock = spy(client.transporter);
  when(transporterMock.write(anything(), anything())).thenResolve({});

  it('set personalization strategy', async () => {
    const strategy = {
      eventsScoring: {
        'Add to cart': { score: 50, type: 'conversion' },
        Purchase: { score: 100, type: 'conversion' },
      },
      facetsScoring: {
        brand: { score: 100 },
        categories: { score: 10 },
      },
    };

    await client.setPersonalizationStrategy(strategy, { foo: 'bar' });

    verify(
      transporterMock.write(
        deepEqual({
          method: MethodEnum.Post,
          path: '1/recommendation/personalization/strategy',
          data: strategy,
        }),
        deepEqual({ foo: 'bar' })
      )
    ).once();
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

  verify(transporterMock.read(anything(), deepEqual(mapRequestOptions(undefined)))).once();
});
