import { createBrowserLocalStorageCache } from '@sefai/cache-browser-local-storage';
import { createFallbackableCache } from '@sefai/cache-common';
import { createInMemoryCache } from '@sefai/cache-in-memory';
import { AuthMode, version } from '@sefai/client-common';
import {
  createSearchClient,
  customRequest,
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
} from '@sefai/client-search';
import { LogLevelEnum } from '@sefai/logger-common';
import { createConsoleLogger } from '@sefai/logger-console';
import { getRecommendations, WithRecommendMethods } from '@sefai/recommend';
import { createBrowserXhrRequester } from '@sefai/requester-browser-xhr';
import { createUserAgent, Request, RequestOptions } from '@sefai/transporter';

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
      customRequest,
      initIndex: base => (indexName: string): SearchIndex => {
        return initIndex(base)(indexName, {
          methods: { search, searchForFacetValues, findAnswers },
        });
      },
      getRecommendations,
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
  readonly findAnswers: <TObject>(
    query: string,
    queryLanguages: readonly string[],
    requestOptions?: RequestOptions & FindAnswersOptions
  ) => Readonly<Promise<FindAnswersResponse<TObject>>>;
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
  readonly customRequest: <TResponse>(
    request: Request,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<TResponse>>;
  readonly getRecommendations: WithRecommendMethods<BaseSearchClient>['getRecommendations'];
};

export { WithoutCredentials, AlgoliaSearchOptions } from '../types';
