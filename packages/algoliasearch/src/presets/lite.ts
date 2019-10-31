import {
  createSearchClient as baseCreateSearchClient,
  SearchClientOptions,
} from '@algolia/client-search/createSearchClient';
import { initIndex } from '@algolia/client-search/methods/client/initIndex';
import {
  HasMultipleQueries,
  multipleQueries,
} from '@algolia/client-search/methods/client/multipleQueries';
import {
  HasMultipleSearchForFacetValues,
  multipleSearchForFacetValues,
} from '@algolia/client-search/methods/client/multipleSearchForFacetValues';
import { HasSearch, search } from '@algolia/client-search/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/client-search/methods/index/searchForFacetValues';
import { SearchClient as BaseSearchClient } from '@algolia/client-search/types/SearchClient';
import { TransporterOptions } from '@algolia/transporter/types/TransporterOptions';

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

export type HasInitIndex = {
  readonly initIndex: (indexName: string) => SearchIndex;
};
