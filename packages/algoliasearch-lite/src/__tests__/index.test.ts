import { algoliasearch } from '../algoliasearch'; // When using TypeScript
import { SearchClient } from '@algolia/search-client';

describe('algoliasearch', () => {
  it('creates an instance of the search client', () => {
    const client = algoliasearch('foo', 'bar');
    expect(client).toBeInstanceOf(SearchClient);
    expect(client.appId).toBe('foo');
  });

  it('creates an instance of the search index', () => {
    const index = algoliasearch('foo', 'bar').initIndex('foo');
    expect(index).toHaveProperty('search');
    expect(index).toHaveProperty('searchForFacetValues');
  });

  it('sets default user agents', () => {
    const client = algoliasearch('foo', 'bar');

    expect(client.transporter.headers).toEqual({
      'content-type': 'application/json',
      'x-algolia-application-id': 'foo',
      'x-algolia-api-key': 'bar',
    });

    expect(client.transporter.queryParameters).toEqual({
      'x-algolia-agent': 'Algolia for JavaScript (4.0.0-alpha.0); Browser (lite)',
    });
  });
});
