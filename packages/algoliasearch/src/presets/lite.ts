import { createSearchClient as baseCreateSearchClient } from '@algolia/search-client';
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
import { TransporterOptions } from '@algolia/transporter';

export type SearchClient = HasMultipleQueries & HasMultipleSearchForFacetValues;

export type SearchIndex = SearchIndexPreset & HasSearch & HasSearchForFacetValues;

export const methods = {
  searchClient: [multipleQueries, multipleSearchForFacetValues],
  searchIndex: [search, searchForFacetValues],
};

// eslint-disable-next-line
export const createSearchClient = (options: SearchClientOptions & TransporterOptions) => {
  const base = baseCreateSearchClient<SearchClient>({ ...options, methods: methods.searchClient });

  const initIndex = base.initIndex;

  return {
    ...base,
    initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
      return initIndex.bind(this)(indexName, {
        methods: methods.searchIndex,
      });
    },
  };
};
