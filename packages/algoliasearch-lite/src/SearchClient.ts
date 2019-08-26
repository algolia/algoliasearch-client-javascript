import { search, HasSearch } from '@algolia/search-client/src/Methods/SearchIndex/search';
import {
  searchForFacetValues,
  HasSearchForFacetValues,
} from '@algolia/search-client/src/Methods/SearchIndex/searchForFacetValues';
import { SearchClient as BaseSearchClient } from '@algolia/search-client';

export class SearchClient extends BaseSearchClient {
  public initIndex<TSearchIndex = HasSearch & HasSearchForFacetValues>(
    indexName: string
  ): TSearchIndex {
    return super.initIndex(indexName, {
      methods: [search, searchForFacetValues],
    });
  }
}
