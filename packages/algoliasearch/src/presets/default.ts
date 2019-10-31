import { createAnalyticsClient } from '@algolia/client-analytics/createAnalyticsClient';
import { addABTest, HasAddABTest } from '@algolia/client-analytics/methods/addABTest';
import { deleteABTest, HasDeleteABTest } from '@algolia/client-analytics/methods/deleteABTest';
import { getABTest, HasGetABTest } from '@algolia/client-analytics/methods/getABTest';
import { getABTests, HasGetABTests } from '@algolia/client-analytics/methods/getABTests';
import { HasStopABTest, stopABTest } from '@algolia/client-analytics/methods/stopABTest';
import { AnalyticsClient as BaseAnalyticsClient } from '@algolia/client-analytics/types/AnalyticsClient';
import {
  createSearchClient as baseCreateSearchClient,
  SearchClientOptions,
} from '@algolia/client-search/createSearchClient';
import { copyIndex, HasCopyIndex } from '@algolia/client-search/methods/client/copyIndex';
import { copySettings, HasCopySettings } from '@algolia/client-search/methods/client/copySettings';
import { copySynonyms, HasCopySynonyms } from '@algolia/client-search/methods/client/copySynonyms';
import { getLogs, HasGetLogs } from '@algolia/client-search/methods/client/getLogs';
import {
  getPersonalizationStrategy,
  HasGetPersonalizationStrategy,
} from '@algolia/client-search/methods/client/getPersonalizationStrategy';
import { initIndex } from '@algolia/client-search/methods/client/initIndex';
import { HasListClusters, listClusters } from '@algolia/client-search/methods/client/listClusters';
import { HasListIndices, listIndices } from '@algolia/client-search/methods/client/listIndices';
import { HasMoveIndex, moveIndex } from '@algolia/client-search/methods/client/moveIndex';
import {
  HasMultipleBatch,
  multipleBatch,
} from '@algolia/client-search/methods/client/multipleBatch';
import {
  HasMultipleGetObjects,
  multipleGetObjects,
} from '@algolia/client-search/methods/client/multipleGetObjects';
import {
  HasMultipleQueries,
  multipleQueries,
} from '@algolia/client-search/methods/client/multipleQueries';
import {
  HasMultipleSearchForFacetValues,
  multipleSearchForFacetValues,
} from '@algolia/client-search/methods/client/multipleSearchForFacetValues';
import {
  HasSetPersonalizationStrategy,
  setPersonalizationStrategy,
} from '@algolia/client-search/methods/client/setPersonalizationStrategy';
import { batch, HasBatch } from '@algolia/client-search/methods/index/batch';
import {
  browseObjects,
  HasBrowseObjects,
} from '@algolia/client-search/methods/index/browseObjects';
import { browseRules, HasBrowseRules } from '@algolia/client-search/methods/index/browseRules';
import {
  browseSynonyms,
  HasBrowseSynonyms,
} from '@algolia/client-search/methods/index/browseSynonyms';
import { clearObjects, HasClearObjects } from '@algolia/client-search/methods/index/clearObjects';
import { clearRules, HasClearRules } from '@algolia/client-search/methods/index/clearRules';
import {
  clearSynonyms,
  HasClearSynonyms,
} from '@algolia/client-search/methods/index/clearSynonyms';
import { deleteBy, HasDeleteBy } from '@algolia/client-search/methods/index/deleteBy';
import { deleteIndex, HasDelete } from '@algolia/client-search/methods/index/deleteIndex';
import { deleteObject, HasDeleteObject } from '@algolia/client-search/methods/index/deleteObject';
import {
  deleteObjects,
  HasDeleteObjects,
} from '@algolia/client-search/methods/index/deleteObjects';
import { deleteRule, HasDeleteRule } from '@algolia/client-search/methods/index/deleteRule';
import {
  deleteSynonym,
  HasDeleteSynonym,
} from '@algolia/client-search/methods/index/deleteSynonym';
import { exists, HasExists } from '@algolia/client-search/methods/index/exists';
import { findObject, HasFindObject } from '@algolia/client-search/methods/index/findObject';
import { getObject, HasGetObject } from '@algolia/client-search/methods/index/getObject';
import {
  getObjectPosition,
  HasGetObjectPosition,
} from '@algolia/client-search/methods/index/getObjectPosition';
import { getObjects, HasGetObjects } from '@algolia/client-search/methods/index/getObjects';
import { getRule, HasGetRule } from '@algolia/client-search/methods/index/getRule';
import { getSettings, HasGetSettings } from '@algolia/client-search/methods/index/getSettings';
import { getSynonym, HasGetSynonym } from '@algolia/client-search/methods/index/getSynonym';
import {
  HasPartialUpdateObject,
  partialUpdateObject,
} from '@algolia/client-search/methods/index/partialUpdateObject';
import {
  HasPartialUpdateObjects,
  partialUpdateObjects,
} from '@algolia/client-search/methods/index/partialUpdateObjects';
import {
  HasReplaceAllObjects,
  replaceAllObjects,
} from '@algolia/client-search/methods/index/replaceAllObjects';
import {
  HasReplaceAllRules,
  replaceAllRules,
} from '@algolia/client-search/methods/index/replaceAllRules';
import {
  HasReplaceAllSynonyms,
  replaceAllSynonyms,
} from '@algolia/client-search/methods/index/replaceAllSynonyms';
import { HasSaveObject, saveObject } from '@algolia/client-search/methods/index/saveObject';
import { HasSaveObjects, saveObjects } from '@algolia/client-search/methods/index/saveObjects';
import { HasSaveRule, saveRule } from '@algolia/client-search/methods/index/saveRule';
import { HasSaveRules, saveRules } from '@algolia/client-search/methods/index/saveRules';
import { HasSaveSynonym, saveSynonym } from '@algolia/client-search/methods/index/saveSynonym';
import { HasSaveSynonyms, saveSynonyms } from '@algolia/client-search/methods/index/saveSynonyms';
import { HasSearch, search } from '@algolia/client-search/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/client-search/methods/index/searchForFacetValues';
import { HasSearchRules, searchRules } from '@algolia/client-search/methods/index/searchRules';
import {
  HasSearchSynonyms,
  searchSynonyms,
} from '@algolia/client-search/methods/index/searchSynonyms';
import { HasSetSettings, setSettings } from '@algolia/client-search/methods/index/setSettings';
import { HasWaitTask, waitTask } from '@algolia/client-search/methods/index/waitTask';
import { SearchClient as BaseSearchClient } from '@algolia/client-search/types/SearchClient';
import { SearchIndex as SearchIndexPreset } from '@algolia/client-search/types/SearchIndex';
import { TransporterOptions } from '@algolia/transporter/types/TransporterOptions';

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
  HasMultipleSearchForFacetValues;

export type SearchIndex = SearchIndexPreset &
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
