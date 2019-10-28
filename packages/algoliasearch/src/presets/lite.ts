import { SearchClient as BaseSearchClient } from '@algolia/search-client';
import {
  HasMultipleQueries,
  multipleQueries,
} from '@algolia/search-client/src/methods/client/multipleQueries';
import {
  HasMultipleSearchForFacetValues,
  multipleSearchForFacetValues,
} from '@algolia/search-client/src/methods/client/multipleSearchForFacetValues';
import { HasSearch, search } from '@algolia/search-client/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/search-client/src/methods/index/searchForFacetValues';
import { SearchClientOptions } from '@algolia/search-client/src/SearchClient';
import { SearchIndex as SearchIndexPreset } from '@algolia/search-client/src/SearchIndex';
import { compose } from '@algolia/support';
import { TransporterOptions } from '@algolia/transporter';

export type SearchClient = SearchClientPreset &
  HasMultipleQueries &
  HasMultipleSearchForFacetValues;

export type SearchIndex = SearchIndexPreset & HasSearch & HasSearchForFacetValues;

export const methods = {
  searchClient: [multipleQueries, multipleSearchForFacetValues],
  searchIndex: [search, searchForFacetValues],
};

export class SearchClientPreset extends BaseSearchClient {
  public initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
    return super.initIndex<TSearchIndex>(indexName, {
      methods: methods.searchIndex,
    });
  }
}

export const createSearchClient = (
  options: SearchClientOptions & TransporterOptions
): SearchClient => {
  return compose<SearchClient>(
    new SearchClientPreset(options),
    { methods: methods.searchClient }
  );
};
