import { algoliasearch } from '../algoliasearch'; // When using TypeScript
import { SearchClient } from '@algolia/search-client';

describe('algoliasearch', () => {
  it('creates an instance of the search client', () => {
    const client = algoliasearch('foo', 'bar');
    expect(client).toBeInstanceOf(SearchClient);
    expect(client.appId).toBe('foo');
  });
});
