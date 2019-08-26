import { algoliasearch } from '../.'; // When using TypeScript
import { SearchClient } from '../../../search-client/src';

describe('algoliasearch', (): void => {
  it('creates an instance of the search client', (): void => {
    const client = algoliasearch('foo', 'bar');
    expect(client).toBeInstanceOf(SearchClient);
    expect(client.appId).toBe('foo');
  });
});
