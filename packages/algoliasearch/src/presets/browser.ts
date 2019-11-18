import {
  addABTest,
  AnalyticsClient as BaseAnalyticsClient,
  createAnalyticsClient,
  deleteABTest,
  getABTest,
  getABTests,
  HasAddABTest,
  HasDeleteABTest,
  HasGetABTest,
  HasGetABTests,
  HasStopABTest,
  stopABTest,
} from '@algolia/client-analytics';
import {
  addApiKey,
  batch,
  browseObjects,
  browseRules,
  browseSynonyms,
  clearObjects,
  clearRules,
  clearSynonyms,
  copyIndex,
  copySettings,
  copySynonyms,
  createSearchClient as baseCreateSearchClient,
  deleteApiKey,
  deleteBy,
  deleteIndex,
  deleteObject,
  deleteObjects,
  deleteRule,
  deleteSynonym,
  exists,
  findObject,
  getApiKey,
  getLogs,
  getObject,
  getObjectPosition,
  getObjects,
  getPersonalizationStrategy,
  getRule,
  getSettings,
  getSynonym,
  HasAddApiKey,
  HasBatch,
  HasBrowseObjects,
  HasBrowseRules,
  HasBrowseSynonyms,
  HasClearObjects,
  HasClearRules,
  HasClearSynonyms,
  HasCopyIndex,
  HasCopySettings,
  HasCopySynonyms,
  HasDelete,
  HasDeleteApiKey,
  HasDeleteBy,
  HasDeleteObject,
  HasDeleteObjects,
  HasDeleteRule,
  HasDeleteSynonym,
  HasExists,
  HasFindObject,
  HasGetApiKey,
  HasGetLogs,
  HasGetObject,
  HasGetObjectPosition,
  HasGetObjects,
  HasGetPersonalizationStrategy,
  HasGetRule,
  HasGetSettings,
  HasGetSynonym,
  HasListApiKeys,
  HasListClusters,
  HasListIndices,
  HasMoveIndex,
  HasMultipleBatch,
  HasMultipleGetObjects,
  HasMultipleQueries,
  HasMultipleSearchForFacetValues,
  HasPartialUpdateObject,
  HasPartialUpdateObjects,
  HasReplaceAllObjects,
  HasReplaceAllRules,
  HasReplaceAllSynonyms,
  HasRestoreApiKey,
  HasSaveObject,
  HasSaveObjects,
  HasSaveRule,
  HasSaveRules,
  HasSaveSynonym,
  HasSaveSynonyms,
  HasSearch,
  HasSearchForFacetValues,
  HasSearchRules,
  HasSearchSynonyms,
  HasSetPersonalizationStrategy,
  HasSetSettings,
  HasUpdateApiKey,
  HasWaitTask,
  initIndex,
  listApiKeys,
  listClusters,
  listIndices,
  moveIndex,
  multipleBatch,
  multipleGetObjects,
  multipleQueries,
  multipleSearchForFacetValues,
  partialUpdateObject,
  partialUpdateObjects,
  replaceAllObjects,
  replaceAllRules,
  replaceAllSynonyms,
  restoreApiKey,
  saveObject,
  saveObjects,
  saveRule,
  saveRules,
  saveSynonym,
  saveSynonyms,
  search,
  SearchClient as BaseSearchClient,
  SearchClientOptions,
  searchForFacetValues,
  SearchIndex as BaseSearchIndex,
  searchRules,
  searchSynonyms,
  setPersonalizationStrategy,
  setSettings,
  updateApiKey,
  waitTask,
} from '@algolia/client-search';
import { TransporterOptions } from '@algolia/transporter';

export type SearchClient = BaseSearchClient &
  HasInitIndex &
  HasInitAnalytics &
  HasMultipleBatch &
  HasMultipleGetObjects &
  HasMultipleQueries &
  HasCopyIndex &
  HasCopySettings &
  HasCopySynonyms &
  HasMoveIndex &
  HasGetPersonalizationStrategy &
  HasSetPersonalizationStrategy &
  HasListIndices &
  HasGetLogs &
  HasListClusters &
  HasMultipleSearchForFacetValues &
  HasAddApiKey &
  HasGetApiKey &
  HasListApiKeys &
  HasUpdateApiKey &
  HasDeleteApiKey &
  HasRestoreApiKey;

export type SearchIndex = BaseSearchIndex &
  HasBatch &
  HasDelete &
  HasSearch &
  HasSearchForFacetValues &
  HasWaitTask &
  HasSaveObject &
  HasSaveObjects &
  HasGetObject &
  HasGetObjects &
  HasSetSettings &
  HasGetSettings &
  HasPartialUpdateObject &
  HasPartialUpdateObjects &
  HasDeleteObject &
  HasDeleteBy &
  HasDeleteObjects &
  HasClearObjects &
  HasBrowseObjects &
  HasGetObjectPosition &
  HasFindObject &
  HasExists &
  HasSaveSynonym &
  HasSaveSynonyms &
  HasGetSynonym &
  HasSearchSynonyms &
  HasBrowseSynonyms &
  HasDeleteSynonym &
  HasClearSynonyms &
  HasReplaceAllObjects &
  HasReplaceAllSynonyms &
  HasSearchRules &
  HasGetRule &
  HasDeleteRule &
  HasSaveRule &
  HasSaveRules &
  HasReplaceAllRules &
  HasBrowseRules &
  HasClearRules;

export type AnalyticsClient = BaseAnalyticsClient &
  HasAddABTest &
  HasGetABTest &
  HasGetABTests &
  HasStopABTest &
  HasDeleteABTest;

export const methods = {
  searchClient: [
    multipleBatch,
    multipleGetObjects,
    multipleQueries,
    copyIndex,
    copySettings,
    copySynonyms,
    moveIndex,
    getPersonalizationStrategy,
    setPersonalizationStrategy,
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
  ],
  searchIndex: [
    batch,
    deleteIndex,
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
  ],
  analyticsClient: [addABTest, getABTest, getABTests, stopABTest, deleteABTest],
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
    initAnalytics(region?: string): AnalyticsClient {
      return createAnalyticsClient({
        ...options,
        region,
        methods: methods.analyticsClient,
      });
    },
  };
};

export type HasInitAnalytics = {
  readonly initAnalytics: (region?: string) => AnalyticsClient;
};

export type HasInitIndex = {
  readonly initIndex: (indexName: string) => SearchIndex;
};
