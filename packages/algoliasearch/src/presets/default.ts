import { createAnalyticsClient } from '@algolia/client-analytics';
import { addABTest, HasAddABTest } from '@algolia/client-analytics/src/methods/addABTest';
import { deleteABTest, HasDeleteABTest } from '@algolia/client-analytics/src/methods/deleteABTest';
import { getABTest, HasGetABTest } from '@algolia/client-analytics/src/methods/getABTest';
import { getABTests, HasGetABTests } from '@algolia/client-analytics/src/methods/getABTests';
import { HasStopABTest, stopABTest } from '@algolia/client-analytics/src/methods/stopABTest';
import { createSearchClient as baseCreateSearchClient } from '@algolia/client-search';
import { SearchClientOptions } from '@algolia/client-search/src/createSearchClient';
import { copyIndex, HasCopyIndex } from '@algolia/client-search/src/methods/client/copyIndex';
import {
  copySettings,
  HasCopySettings,
} from '@algolia/client-search/src/methods/client/copySettings';
import {
  copySynonyms,
  HasCopySynonyms,
} from '@algolia/client-search/src/methods/client/copySynonyms';
import { getLogs, HasGetLogs } from '@algolia/client-search/src/methods/client/getLogs';
import {
  getPersonalizationStrategy,
  HasGetPersonalizationStrategy,
} from '@algolia/client-search/src/methods/client/getPersonalizationStrategy';
import { initIndex } from '@algolia/client-search/src/methods/client/initIndex';
import {
  HasListClusters,
  listClusters,
} from '@algolia/client-search/src/methods/client/listClusters';
import { HasListIndices, listIndices } from '@algolia/client-search/src/methods/client/listIndices';
import { HasMoveIndex, moveIndex } from '@algolia/client-search/src/methods/client/moveIndex';
import {
  HasMultipleBatch,
  multipleBatch,
} from '@algolia/client-search/src/methods/client/multipleBatch';
import {
  HasMultipleGetObjects,
  multipleGetObjects,
} from '@algolia/client-search/src/methods/client/multipleGetObjects';
import {
  HasMultipleQueries,
  multipleQueries,
} from '@algolia/client-search/src/methods/client/multipleQueries';
import {
  HasMultipleSearchForFacetValues,
  multipleSearchForFacetValues,
} from '@algolia/client-search/src/methods/client/multipleSearchForFacetValues';
import {
  HasSetPersonalizationStrategy,
  setPersonalizationStrategy,
} from '@algolia/client-search/src/methods/client/setPersonalizationStrategy';
import { batch, HasBatch } from '@algolia/client-search/src/methods/index/batch';
import {
  browseObjects,
  HasBrowseObjects,
} from '@algolia/client-search/src/methods/index/browseObjects';
import { browseRules, HasBrowseRules } from '@algolia/client-search/src/methods/index/browseRules';
import {
  browseSynonyms,
  HasBrowseSynonyms,
} from '@algolia/client-search/src/methods/index/browseSynonyms';
import {
  clearObjects,
  HasClearObjects,
} from '@algolia/client-search/src/methods/index/clearObjects';
import { clearRules, HasClearRules } from '@algolia/client-search/src/methods/index/clearRules';
import {
  clearSynonyms,
  HasClearSynonyms,
} from '@algolia/client-search/src/methods/index/clearSynonyms';
import { deleteBy, HasDeleteBy } from '@algolia/client-search/src/methods/index/deleteBy';
import { deleteIndex, HasDelete } from '@algolia/client-search/src/methods/index/deleteIndex';
import {
  deleteObject,
  HasDeleteObject,
} from '@algolia/client-search/src/methods/index/deleteObject';
import {
  deleteObjects,
  HasDeleteObjects,
} from '@algolia/client-search/src/methods/index/deleteObjects';
import { deleteRule, HasDeleteRule } from '@algolia/client-search/src/methods/index/deleteRule';
import {
  deleteSynonym,
  HasDeleteSynonym,
} from '@algolia/client-search/src/methods/index/deleteSynonym';
import { exists, HasExists } from '@algolia/client-search/src/methods/index/exists';
import { findObject, HasFindObject } from '@algolia/client-search/src/methods/index/findObject';
import { getObject, HasGetObject } from '@algolia/client-search/src/methods/index/getObject';
import {
  getObjectPosition,
  HasGetObjectPosition,
} from '@algolia/client-search/src/methods/index/getObjectPosition';
import { getObjects, HasGetObjects } from '@algolia/client-search/src/methods/index/getObjects';
import { getRule, HasGetRule } from '@algolia/client-search/src/methods/index/getRule';
import { getSettings, HasGetSettings } from '@algolia/client-search/src/methods/index/getSettings';
import { getSynonym, HasGetSynonym } from '@algolia/client-search/src/methods/index/getSynonym';
import {
  HasPartialUpdateObject,
  partialUpdateObject,
} from '@algolia/client-search/src/methods/index/partialUpdateObject';
import {
  HasPartialUpdateObjects,
  partialUpdateObjects,
} from '@algolia/client-search/src/methods/index/partialUpdateObjects';
import {
  HasReplaceAllObjects,
  replaceAllObjects,
} from '@algolia/client-search/src/methods/index/replaceAllObjects';
import {
  HasReplaceAllRules,
  replaceAllRules,
} from '@algolia/client-search/src/methods/index/replaceAllRules';
import {
  HasReplaceAllSynonyms,
  replaceAllSynonyms,
} from '@algolia/client-search/src/methods/index/replaceAllSynonyms';
import { HasSaveObject, saveObject } from '@algolia/client-search/src/methods/index/saveObject';
import { HasSaveObjects, saveObjects } from '@algolia/client-search/src/methods/index/saveObjects';
import { HasSaveRule, saveRule } from '@algolia/client-search/src/methods/index/saveRule';
import { HasSaveRules, saveRules } from '@algolia/client-search/src/methods/index/saveRules';
import { HasSaveSynonym, saveSynonym } from '@algolia/client-search/src/methods/index/saveSynonym';
import {
  HasSaveSynonyms,
  saveSynonyms,
} from '@algolia/client-search/src/methods/index/saveSynonyms';
import { HasSearch, search } from '@algolia/client-search/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/client-search/src/methods/index/searchForFacetValues';
import { HasSearchRules, searchRules } from '@algolia/client-search/src/methods/index/searchRules';
import {
  HasSearchSynonyms,
  searchSynonyms,
} from '@algolia/client-search/src/methods/index/searchSynonyms';
import { HasSetSettings, setSettings } from '@algolia/client-search/src/methods/index/setSettings';
import { HasWaitTask, waitTask } from '@algolia/client-search/src/methods/index/waitTask';
import { SearchIndex as SearchIndexPreset } from '@algolia/client-search/src/types/SearchIndex';
import { TransporterAware, TransporterOptions } from '@algolia/transporter';

export type SearchClient = TransporterAware &
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

export type AnalyticsClient = HasAddABTest &
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createSearchClient = (options: SearchClientOptions & TransporterOptions) => {
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
