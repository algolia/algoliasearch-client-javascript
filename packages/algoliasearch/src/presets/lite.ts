import { createSearchClient as baseCreateSearchClient } from '@algolia/client-search';
import { SearchClientOptions } from '@algolia/client-search/src/createSearchClient';
import { HasInitIndex, initIndex } from '@algolia/client-search/src/methods/client/initIndex';
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
import { SearchClient as BaseSearchClient } from '@algolia/client-search/src/types/SearchClient';
import { TransporterOptions } from '@algolia/transporter/src/types/TransporterOptions';

export type SearchClient = BaseSearchClient &
  HasInitIndex &
  HasMultipleQueries &
  HasMultipleSearchForFacetValues;

export type SearchIndex = HasSearch & HasSearchForFacetValues;

export const methods = {
  searchClient: [multipleQueries, multipleSearchForFacetValues],
  searchIndex: [search, searchForFacetValues],
};

export const createSearchClient = (
  options: SearchClientOptions & TransporterOptions
): SearchClient => {
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
