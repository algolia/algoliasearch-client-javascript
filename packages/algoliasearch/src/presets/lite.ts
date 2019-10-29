import { createSearchClient as baseCreateSearchClient } from '@algolia/client-search';
import { SearchClientOptions } from '@algolia/client-search/src/createSearchClient';
import { initIndex } from '@algolia/client-search/src/methods/client/initIndex';
import {
  HasMultipleQueries,
  multipleQueries,
} from '@algolia/client-search/src/methods/client/multipleQueries';
import {
  HasMultipleSearchForFacetValues,
  multipleSearchForFacetValues,
} from '@algolia/client-search/src/methods/client/multipleSearchForFacetValues';
import { HasSearch, search } from '@algolia/client-search/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/client-search/src/methods/index/searchForFacetValues';
import { TransporterOptions } from '@algolia/transporter/src/types/TransporterOptions';

export type SearchClient = HasMultipleQueries & HasMultipleSearchForFacetValues;

export type SearchIndex = HasSearch & HasSearchForFacetValues;

export const methods = {
  searchClient: [multipleQueries, multipleSearchForFacetValues],
  searchIndex: [search, searchForFacetValues],
};

// eslint-disable-next-line
export const createSearchClient = (options: SearchClientOptions & TransporterOptions) => {
  const base = baseCreateSearchClient<SearchClient>({ ...options, methods: methods.searchClient });

  return {
    ...base,
    initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
      return initIndex(this).initIndex(indexName, {
        methods: methods.searchIndex,
      });
    },
  };
};
