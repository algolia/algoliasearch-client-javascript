import algoliasearch from '../builds/node';
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
      'content-type': 'application/x-www-form-urlencoded',
      'x-algolia-application-id': 'foo',
      'x-algolia-api-key': 'bar',
    });

    expect(client.transporter.queryParameters).toEqual({
      'x-algolia-agent': 'Algolia for JavaScript (4.0.0-alpha.0); Node.js (12.9.1)',
    });
  });
});
