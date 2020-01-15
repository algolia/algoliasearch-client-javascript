import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createFallbackableCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import {
  ABTest,
  addABTest,
  AddABTestResponse,
  AnalyticsClient as BaseAnalyticsClient,
  createAnalyticsClient,
  deleteABTest,
  DeleteABTestResponse,
  getABTest,
  GetABTestResponse,
  getABTests,
  GetABTestsOptions,
  GetABTestsResponse,
  stopABTest,
  StopABTestResponse,
} from '@algolia/client-analytics';
import { version, WaitablePromise } from '@algolia/client-common';
import {
  createRecommendationClient,
  getPersonalizationStrategy,
  GetPersonalizationStrategyResponse,
  PersonalizationStrategy,
  RecommendationClient as BaseRecommendationClient,
  setPersonalizationStrategy,
  SetPersonalizationStrategyResponse,
} from '@algolia/client-recommendation';
import {
  addApiKey,
  AddApiKeyOptions,
  AddApiKeyResponse,
  assignUserID,
  AssignUserIDResponse,
  assignUserIDs,
  AssignUserIDsResponse,
  batch,
  BatchRequest,
  BatchResponse,
  browseObjects,
  BrowseOptions,
  browseRules,
  browseSynonyms,
  ChunkedBatchResponse,
  ChunkOptions,
  clearObjects,
  clearRules,
  ClearRulesOptions,
  clearSynonyms,
  ClearSynonymsOptions,
  copyIndex,
  CopyIndexOptions,
  copyRules,
  copySettings,
  copySynonyms,
  createSearchClient,
  deleteApiKey,
  DeleteApiKeyResponse,
  deleteBy,
  DeleteByFiltersOptions,
  deleteIndex,
  deleteObject,
  deleteObjects,
  DeleteResponse,
  deleteRule,
  deleteSynonym,
  DeleteSynonymOptions,
  exists,
  findObject,
  FindObjectOptions,
  FindObjectResponse,
  getApiKey,
  GetApiKeyResponse,
  getLogs,
  GetLogsResponse,
  getObject,
  GetObjectOptions,
  getObjectPosition,
  getObjects,
  GetObjectsOptions,
  GetObjectsResponse,
  getRule,
  getSettings,
  getSynonym,
  getTopUserIDs,
  GetTopUserIDsResponse,
  getUserID,
  IndexOperationResponse,
  initIndex,
  listApiKeys,
  ListApiKeysResponse,
  listClusters,
  ListClustersResponse,
  listIndices,
  ListIndicesResponse,
  listUserIDs,
  ListUserIDsOptions,
  ListUserIDsResponse,
  moveIndex,
  multipleBatch,
  MultipleBatchRequest,
  MultipleBatchResponse,
  MultipleGetObject,
  multipleGetObjects,
  MultipleGetObjectsResponse,
  multipleQueries,
  MultipleQueriesOptions,
  MultipleQueriesQuery,
  MultipleQueriesResponse,
  multipleSearchForFacetValues,
  ObjectWithObjectID,
  partialUpdateObject,
  PartialUpdateObjectResponse,
  partialUpdateObjects,
  PartialUpdateObjectsOptions,
  removeUserID,
  RemoveUserIDResponse,
  replaceAllObjects,
  ReplaceAllObjectsOptions,
  replaceAllRules,
  replaceAllSynonyms,
  restoreApiKey,
  RestoreApiKeyResponse,
  Rule,
  saveObject,
  SaveObjectResponse,
  saveObjects,
  SaveObjectsOptions,
  saveRule,
  SaveRuleResponse,
  saveRules,
  SaveRulesOptions,
  SaveRulesResponse,
  saveSynonym,
  SaveSynonymResponse,
  saveSynonyms,
  SaveSynonymsOptions,
  SaveSynonymsResponse,
  search,
  SearchClient as BaseSearchClient,
  searchForFacetValues,
  SearchForFacetValuesQueryParams,
  SearchForFacetValuesResponse,
  SearchIndex as BaseSearchIndex,
  SearchOptions,
  SearchResponse,
  searchRules,
  SearchRulesOptions,
  searchSynonyms,
  SearchSynonymsOptions,
  SearchSynonymsResponse,
  searchUserIDs,
  SearchUserIDsOptions,
  SearchUserIDsResponse,
  setSettings,
  SetSettingsResponse,
  Settings,
  Synonym,
  updateApiKey,
  UpdateApiKeyOptions,
  UpdateApiKeyResponse,
  UserIDResponse,
  waitTask,
} from '@algolia/client-search';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { createUserAgent, RequestOptions } from '@algolia/transporter';

import { AlgoliaSearchOptions, InitAnalyticsOptions, InitRecommendationOptions } from '../types';

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
    userAgent: createUserAgent(version).add({ segment: 'Browser' }),
  };

  return createSearchClient({
    ...commonOptions,
    ...options,
    methods: {
      search: multipleQueries,
      searchForFacetValues: multipleSearchForFacetValues,
      multipleBatch,
      multipleGetObjects,
      multipleQueries,
      copyIndex,
      copySettings,
      copySynonyms,
      copyRules,
      moveIndex,
      listIndices,
      getLogs,
      listClusters,
      multipleSearchForFacetValues,
      getApiKey,
      addApiKey,
      listApiKeys,
      updateApiKey,
      deleteApiKey,
      restoreApiKey,
      assignUserID,
      assignUserIDs,
      getUserID,
      searchUserIDs,
      listUserIDs,
      getTopUserIDs,
      removeUserID,
      initIndex: base => (indexName: string): SearchIndex => {
        return initIndex(base)(indexName, {
          methods: {
            batch,
            delete: deleteIndex,
            getObject,
            getObjects,
            saveObject,
            saveObjects,
            search,
            searchForFacetValues,
            waitTask,
            setSettings,
            getSettings,
            partialUpdateObject,
            partialUpdateObjects,
            deleteObject,
            deleteObjects,
            deleteBy,
            clearObjects,
            browseObjects,
            getObjectPosition,
            findObject,
            exists,
            saveSynonym,
            saveSynonyms,
            getSynonym,
            searchSynonyms,
            browseSynonyms,
            deleteSynonym,
            clearSynonyms,
            replaceAllObjects,
            replaceAllSynonyms,
            searchRules,
            getRule,
            deleteRule,
            saveRule,
            saveRules,
            replaceAllRules,
            browseRules,
            clearRules,
          },
        });
      },
      initAnalytics: () => (clientOptions?: InitAnalyticsOptions): AnalyticsClient => {
        return createAnalyticsClient({
          ...commonOptions,
          ...clientOptions,
          methods: {
            addABTest,
            getABTest,
            getABTests,
            stopABTest,
            deleteABTest,
          },
        });
      },
      initRecommendation: () => (
        clientOptions?: InitRecommendationOptions
      ): RecommendationClient => {
        return createRecommendationClient({
          ...commonOptions,
          ...clientOptions,
          methods: {
            getPersonalizationStrategy,
            setPersonalizationStrategy,
          },
        });
      },
    },
  });
}

// eslint-disable-next-line functional/immutable-data
algoliasearch.version = version;

export type RecommendationClient = BaseRecommendationClient & {
  readonly getPersonalizationStrategy: (
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetPersonalizationStrategyResponse>>;
  readonly setPersonalizationStrategy: (
    personalizationStrategy: PersonalizationStrategy,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SetPersonalizationStrategyResponse>>;
};

export type AnalyticsClient = BaseAnalyticsClient & {
  readonly addABTest: (
    abTest: ABTest,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<AddABTestResponse>>;
  readonly getABTest: (
    abTestID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetABTestResponse>>;
  readonly getABTests: (
    requestOptions?: RequestOptions & GetABTestsOptions
  ) => Readonly<Promise<GetABTestsResponse>>;
  readonly stopABTest: (
    abTestID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<StopABTestResponse>>;
  readonly deleteABTest: (
    abTestID: number,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<DeleteABTestResponse>>;
};

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
  readonly batch: (
    requests: readonly BatchRequest[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<BatchResponse>>;
  readonly delete: (requestOptions?: RequestOptions) => Readonly<WaitablePromise<DeleteResponse>>;
  readonly getObject: <TObject>(
    objectID: string,
    requestOptions?: RequestOptions & GetObjectOptions
  ) => Readonly<Promise<TObject & ObjectWithObjectID>>;
  readonly getObjects: <TObject>(
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & GetObjectsOptions
  ) => Readonly<Promise<GetObjectsResponse<TObject>>>;
  readonly saveObject: (
    object: Readonly<Record<string, any>>,
    requestOptions?: RequestOptions & ChunkOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<SaveObjectResponse>>;
  readonly saveObjects: (
    objects: ReadonlyArray<Readonly<Record<string, any>>>,
    requestOptions?: RequestOptions & ChunkOptions & SaveObjectsOptions
  ) => Readonly<WaitablePromise<ChunkedBatchResponse>>;
  readonly waitTask: (taskID: number, requestOptions?: RequestOptions) => Readonly<Promise<void>>;
  readonly setSettings: (
    settings: Settings,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<SetSettingsResponse>>;
  readonly getSettings: (requestOptions?: RequestOptions) => Readonly<Promise<Settings>>;
  readonly partialUpdateObject: (
    object: Record<string, any>,
    requestOptions?: RequestOptions & ChunkOptions & PartialUpdateObjectsOptions
  ) => Readonly<WaitablePromise<PartialUpdateObjectResponse>>;
  readonly partialUpdateObjects: (
    objects: ReadonlyArray<Record<string, any>>,
    requestOptions?: RequestOptions & ChunkOptions & PartialUpdateObjectsOptions
  ) => Readonly<WaitablePromise<ChunkedBatchResponse>>;
  readonly deleteObject: (
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
  readonly deleteObjects: (
    objectIDs: readonly string[],
    requestOptions?: RequestOptions & ChunkOptions
  ) => Readonly<WaitablePromise<ChunkedBatchResponse>>;
  readonly deleteBy: (
    filters: DeleteByFiltersOptions,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
  readonly clearObjects: (
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
  readonly browseObjects: <TObject>(
    requestOptions?: SearchOptions & BrowseOptions<TObject> & RequestOptions
  ) => Readonly<Promise<void>>;
  readonly getObjectPosition: (searchResponse: SearchResponse<{}>, objectID: string) => number;
  readonly findObject: <TObject>(
    callback: (object: TObject & ObjectWithObjectID) => boolean,
    requestOptions?: FindObjectOptions & RequestOptions
  ) => Readonly<Promise<FindObjectResponse<TObject>>>;
  readonly exists: (requestOptions?: RequestOptions) => Readonly<Promise<boolean>>;
  readonly saveSynonym: (
    synonym: Synonym,
    requestOptions?: RequestOptions & SaveSynonymsOptions
  ) => Readonly<WaitablePromise<SaveSynonymResponse>>;
  readonly saveSynonyms: (
    synonyms: readonly Synonym[],
    requestOptions?: SaveSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
  readonly getSynonym: (
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<Synonym>>;
  readonly searchSynonyms: (
    query: string,
    requestOptions?: SearchSynonymsOptions & RequestOptions
  ) => Readonly<Promise<SearchSynonymsResponse>>;
  readonly browseSynonyms: (
    requestOptions?: SearchSynonymsOptions & BrowseOptions<Synonym> & RequestOptions
  ) => Readonly<Promise<void>>;
  readonly deleteSynonym: (
    objectID: string,
    requestOptions?: DeleteSynonymOptions & RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
  readonly clearSynonyms: (
    requestOptions?: ClearSynonymsOptions & RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
  readonly replaceAllObjects: (
    objects: ReadonlyArray<Readonly<Record<string, any>>>,
    requestOptions?: ReplaceAllObjectsOptions & ChunkOptions & SaveObjectsOptions & RequestOptions
  ) => Readonly<WaitablePromise<ChunkedBatchResponse>>;
  readonly replaceAllSynonyms: (
    synonyms: readonly Synonym[],
    requestOptions?: RequestOptions &
      Pick<SaveSynonymsOptions, Exclude<keyof SaveSynonymsOptions, 'replaceExistingSynonyms'>>
  ) => Readonly<WaitablePromise<SaveSynonymsResponse>>;
  readonly searchRules: (
    query: string,
    requestOptions?: RequestOptions & SearchRulesOptions
  ) => Readonly<Promise<SearchResponse<Rule>>>;
  readonly getRule: (objectID: string, requestOptions?: RequestOptions) => Readonly<Promise<Rule>>;
  readonly deleteRule: (
    objectID: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
  readonly saveRule: (
    rule: Rule,
    requestOptions?: RequestOptions & SaveRulesOptions
  ) => Readonly<WaitablePromise<SaveRuleResponse>>;
  readonly saveRules: (
    rules: readonly Rule[],
    requestOptions?: RequestOptions & SaveRulesOptions
  ) => Readonly<WaitablePromise<SaveRulesResponse>>;
  readonly replaceAllRules: (
    rules: readonly Rule[],
    requestOptions?: RequestOptions & SaveRulesOptions
  ) => Readonly<WaitablePromise<SaveRulesResponse>>;
  readonly browseRules: (
    requestOptions?: SearchRulesOptions & BrowseOptions<Rule> & RequestOptions
  ) => Readonly<Promise<void>>;
  readonly clearRules: (
    requestOptions?: RequestOptions & ClearRulesOptions
  ) => Readonly<WaitablePromise<DeleteResponse>>;
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
  readonly multipleBatch: (
    requests: readonly MultipleBatchRequest[],
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<MultipleBatchResponse>>;
  readonly multipleGetObjects: <TObject>(
    requests: readonly MultipleGetObject[],
    requestOptions?: RequestOptions
  ) => Readonly<Promise<MultipleGetObjectsResponse<TObject>>>;
  readonly multipleQueries: <TObject>(
    queries: readonly MultipleQueriesQuery[],
    requestOptions?: RequestOptions & MultipleQueriesOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;
  readonly copyIndex: (
    from: string,
    to: string,
    requestOptions?: CopyIndexOptions & RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
  readonly copySettings: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
  readonly copyRules: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
  readonly copySynonyms: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
  readonly moveIndex: (
    from: string,
    to: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<IndexOperationResponse>>;
  readonly listIndices: (requestOptions?: RequestOptions) => Readonly<Promise<ListIndicesResponse>>;
  readonly getLogs: (requestOptions?: RequestOptions) => Readonly<Promise<GetLogsResponse>>;
  readonly listClusters: (
    requestOptions?: RequestOptions
  ) => Readonly<Promise<ListClustersResponse>>;
  readonly multipleSearchForFacetValues: (
    queries: ReadonlyArray<{
      readonly indexName: string;
      readonly params: SearchForFacetValuesQueryParams & SearchOptions;
    }>,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<readonly SearchForFacetValuesResponse[]>>;
  readonly getApiKey: (
    apiKey: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetApiKeyResponse>>;
  readonly addApiKey: (
    acl: readonly string[],
    requestOptions?: AddApiKeyOptions &
      Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>
  ) => Readonly<WaitablePromise<AddApiKeyResponse>>;
  readonly listApiKeys: (requestOptions?: RequestOptions) => Readonly<Promise<ListApiKeysResponse>>;
  readonly updateApiKey: (
    apiKey: string,
    requestOptions?: UpdateApiKeyOptions &
      Pick<RequestOptions, Exclude<keyof RequestOptions, 'queryParameters'>>
  ) => Readonly<WaitablePromise<UpdateApiKeyResponse>>;
  readonly deleteApiKey: (
    apiKey: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<DeleteApiKeyResponse>>;
  readonly restoreApiKey: (
    apiKey: string,
    requestOptions?: RequestOptions
  ) => Readonly<WaitablePromise<RestoreApiKeyResponse>>;
  readonly assignUserID: (
    userID: string,
    clusterName: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<AssignUserIDResponse>>;
  readonly assignUserIDs: (
    userIDs: readonly string[],
    clusterName: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<AssignUserIDsResponse>>;
  readonly getUserID: (
    userID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<UserIDResponse>>;
  readonly searchUserIDs: (
    query: string,
    requestOptions?: SearchUserIDsOptions & RequestOptions
  ) => Readonly<Promise<SearchUserIDsResponse>>;
  readonly listUserIDs: (
    requestOptions?: ListUserIDsOptions & RequestOptions
  ) => Readonly<Promise<ListUserIDsResponse>>;
  readonly getTopUserIDs: (
    requestOptions?: RequestOptions
  ) => Readonly<Promise<GetTopUserIDsResponse>>;
  readonly removeUserID: (
    userID: string,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<RemoveUserIDResponse>>;
  readonly initAnalytics: (options?: InitAnalyticsOptions) => AnalyticsClient;
  readonly initRecommendation: (options?: InitRecommendationOptions) => RecommendationClient;
};

export * from '../types';
