import { Method } from '@algolia/requester-types/src/types/Method';
import { anything, deepEqual, spy, verify, when } from 'ts-mockito';

import algoliasearch from '../../../../algoliasearch/src/builds/browser';

describe('search client', () => {
  it('Gives access to appId', () => {
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
          method: Method.Post,
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
