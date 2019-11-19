import { addMethod } from '@algolia/client-common';
import {
  createSearchClient as baseCreateSearchClient,
  HasMultipleQueries,
  HasMultipleSearchForFacetValues,
  HasSearch,
  HasSearchForFacetValues,
  initIndex,
  multipleQueries,
  multipleSearchForFacetValues,
  search,
  SearchClient as BaseSearchClient,
  SearchClientOptions,
  searchForFacetValues,
} from '@algolia/client-search';
import { TransporterOptions } from '@algolia/transporter';

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
      return addMethod(base, initIndex).initIndex(indexName, {
        methods: methods.searchIndex,
      });
    },
  };
};

export type HasInitIndex = {
  readonly initIndex: (indexName: string) => SearchIndex;
};
