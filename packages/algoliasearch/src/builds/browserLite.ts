import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createFallbackableCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { AuthMode, version } from '@algolia/client-common';
import {
  createSearchClient,
  findAnswers,
  FindAnswersOptions,
  FindAnswersResponse,
  initIndex,
  multipleQueries,
  MultipleQueriesOptions,
  MultipleQueriesQuery,
  MultipleQueriesResponse,
  multipleSearchForFacetValues,
  search,
  SearchClient as BaseSearchClient,
  searchForFacetValues,
  SearchForFacetValuesQueryParams,
  SearchForFacetValuesResponse,
  SearchIndex as BaseSearchIndex,
  SearchOptions,
  SearchResponse,
} from '@algolia/client-search';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { createUserAgent, RequestOptions } from '@algolia/transporter';

import { AlgoliaSearchOptions } from '../types';

export default function algoliasearch(
  appId: string,
  apiKey: string,
  options?: AlgoliaSearchOptions
): SearchClient {
  const commonOptions = {
    appId,
    apiKey,
    timeouts: {
      connect: 1,
      read: 2,
      write: 30,
    },
    requester: createBrowserXhrRequester(),
    logger: createConsoleLogger(LogLevelEnum.Error),
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache({ serializable: false }),
    hostsCache: createFallbackableCache({
      caches: [
        createBrowserLocalStorageCache({ key: `${version}-${appId}` }),
        createInMemoryCache(),
      ],
    }),
    userAgent: createUserAgent(version).add({
      segment: 'Browser',
      version: 'lite',
    }),
    authMode: AuthMode.WithinQueryParameters,
  };

  return createSearchClient({
    ...commonOptions,
    ...options,
    methods: {
      search: multipleQueries,
      searchForFacetValues: multipleSearchForFacetValues,
      multipleQueries,
      multipleSearchForFacetValues,
      initIndex: base => (indexName: string): SearchIndex => {
        return initIndex(base)(indexName, {
          methods: { search, searchForFacetValues, findAnswers },
        });
      },
    },
  });
}

// eslint-disable-next-line functional/immutable-data
algoliasearch.version = version;

export type SearchIndex = BaseSearchIndex & {
  readonly search: <TObject>(
    query: string,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<SearchResponse<TObject>>>;
  readonly searchForFacetValues: (
    facetName: string,
    facetQuery: string,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<SearchForFacetValuesResponse>>;
  readonly findAnswers: (
    query: string,
    queryLanguages: readonly string[],
    requestOptions?: RequestOptions & FindAnswersOptions
  ) => Readonly<Promise<FindAnswersResponse>>;
};

export type SearchClient = BaseSearchClient & {
  readonly initIndex: (indexName: string) => SearchIndex;
  readonly search: <TObject>(
    queries: readonly MultipleQueriesQuery[],
    requestOptions?: RequestOptions & MultipleQueriesOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;
  readonly searchForFacetValues: (
    queries: ReadonlyArray<{
      readonly indexName: string;
      readonly params: SearchForFacetValuesQueryParams & SearchOptions;
    }>,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<readonly SearchForFacetValuesResponse[]>>;
};

export { WithoutCredentials, AlgoliaSearchOptions } from '../types';
