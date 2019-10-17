import { SearchClient as BaseSearchClient } from '@algolia/search-client';
import { HasSearch, search } from '@algolia/search-client/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/search-client/src/methods/index/searchForFacetValues';
import { SearchClientOptions } from '@algolia/search-client/src/SearchClient';

export type SearchClient = SearchClientPreset;

export type SearchIndex = HasSearch & HasSearchForFacetValues;

export const methods = {
  searchIndex: [search, searchForFacetValues],
};

export class SearchClientPreset extends BaseSearchClient {
  public initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
    return super.initIndex(indexName, {
      methods: methods.searchIndex,
    });
  }
}

export const createSearchClient = (options: SearchClientOptions): SearchClient => {
  return new SearchClientPreset(options);
};
