import { Method } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { Transporter } from '@algolia/transporter';
import { anything, deepEqual, instance, mock, verify } from 'ts-mockito';

import algoliasearch from '../../../../algoliasearch/src/builds/browser';

describe('Search Client', () => {
  it('Gives access to transporter', () => {
    expect(algoliasearch('appId', 'apiKey').transporter).toBeInstanceOf(Transporter);
  });

  it('Gives access to appId', () => {
    expect(algoliasearch('appId', 'apiKey').appId).toEqual('appId');
  });
});

describe('personalization', () => {
  const client = algoliasearch('appId', 'apiKey');
  const transporterMock = mock(Transporter);
  client.transporter = instance(transporterMock);

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
  const client = algoliasearch('appId', 'apiKey');
  const transporterMock = mock(Transporter);
  client.transporter = instance(transporterMock);

  it('allows to pass search params to the underlying search for facet values of index', async () => {
    const query = {
      indexName: 'foo',
      params: {
        facetName: 'firstname',
        facetQuery: 'Jimmie',
        something: 'else',
      },
    };

    await client.searchForFacetValues([query, query]);

    verify(
      transporterMock.read(
        deepEqual({
          method: Method.Post,
          path: encode('1/indexes/%s/facets/%s/query', 'foo', 'firstname'),
          data: { facetQuery: 'Jimmie' },
          cacheable: true,
        }),
        anything()
      )
    ).twice();
  });
});
