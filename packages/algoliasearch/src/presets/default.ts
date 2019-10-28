import { createAnalyticsClient } from '@algolia/analytics-client';
import { addABTest, HasAddABTest } from '@algolia/analytics-client/src/methods/client/addABTest';
import {
  deleteABTest,
  HasDeleteABTest,
} from '@algolia/analytics-client/src/methods/client/deleteABTest';
import { getABTest, HasGetABTest } from '@algolia/analytics-client/src/methods/client/getABTest';
import { getABTests, HasGetABTests } from '@algolia/analytics-client/src/methods/client/getABTests';
import { HasStopABTest, stopABTest } from '@algolia/analytics-client/src/methods/client/stopABTest';
import {
  createSearchClient as baseCreateSearchClient,
  SearchClient as BaseSearchClient,
} from '@algolia/search-client';
import { copyIndex, HasCopyIndex } from '@algolia/search-client/src/methods/client/copyIndex';
import {
  copySettings,
  HasCopySettings,
} from '@algolia/search-client/src/methods/client/copySettings';
import {
  copySynonyms,
  HasCopySynonyms,
} from '@algolia/search-client/src/methods/client/copySynonyms';
import { getLogs, HasGetLogs } from '@algolia/search-client/src/methods/client/getLogs';
import {
  getPersonalizationStrategy,
  HasGetPersonalizationStrategy,
} from '@algolia/search-client/src/methods/client/getPersonalizationStrategy';
import {
  HasListClusters,
  listClusters,
} from '@algolia/search-client/src/methods/client/listClusters';
import { HasListIndices, listIndices } from '@algolia/search-client/src/methods/client/listIndices';
import { HasMoveIndex, moveIndex } from '@algolia/search-client/src/methods/client/moveIndex';
import {
  HasMultipleBatch,
  multipleBatch,
} from '@algolia/search-client/src/methods/client/multipleBatch';
import {
  HasMultipleGetObjects,
  multipleGetObjects,
} from '@algolia/search-client/src/methods/client/multipleGetObjects';
import {
  HasMultipleQueries,
  multipleQueries,
} from '@algolia/search-client/src/methods/client/multipleQueries';
import {
  HasMultipleSearchForFacetValues,
  multipleSearchForFacetValues,
} from '@algolia/search-client/src/methods/client/multipleSearchForFacetValues';
import {
  HasSetPersonalizationStrategy,
  setPersonalizationStrategy,
} from '@algolia/search-client/src/methods/client/setPersonalizationStrategy';
import { batch, HasBatch } from '@algolia/search-client/src/methods/index/batch';
import {
  browseObjects,
  HasBrowseObjects,
} from '@algolia/search-client/src/methods/index/browseObjects';
import { browseRules, HasBrowseRules } from '@algolia/search-client/src/methods/index/browseRules';
import {
  browseSynonyms,
  HasBrowseSynonyms,
} from '@algolia/search-client/src/methods/index/browseSynonyms';
import {
  clearObjects,
  HasClearObjects,
} from '@algolia/search-client/src/methods/index/clearObjects';
import { clearRules, HasClearRules } from '@algolia/search-client/src/methods/index/clearRules';
import {
  clearSynonyms,
  HasClearSynonyms,
} from '@algolia/search-client/src/methods/index/clearSynonyms';
import { deleteBy, HasDeleteBy } from '@algolia/search-client/src/methods/index/deleteBy';
import { deleteIndex, HasDelete } from '@algolia/search-client/src/methods/index/deleteIndex';
import {
  deleteObject,
  HasDeleteObject,
} from '@algolia/search-client/src/methods/index/deleteObject';
import {
  deleteObjects,
  HasDeleteObjects,
} from '@algolia/search-client/src/methods/index/deleteObjects';
import { deleteRule, HasDeleteRule } from '@algolia/search-client/src/methods/index/deleteRule';
import {
  deleteSynonym,
  HasDeleteSynonym,
} from '@algolia/search-client/src/methods/index/deleteSynonym';
import { exists, HasExists } from '@algolia/search-client/src/methods/index/exists';
import { findObject, HasFindObject } from '@algolia/search-client/src/methods/index/findObject';
import { getObject, HasGetObject } from '@algolia/search-client/src/methods/index/getObject';
import {
  getObjectPosition,
  HasGetObjectPosition,
} from '@algolia/search-client/src/methods/index/getObjectPosition';
import { getObjects, HasGetObjects } from '@algolia/search-client/src/methods/index/getObjects';
import { getRule, HasGetRule } from '@algolia/search-client/src/methods/index/getRule';
import { getSettings, HasGetSettings } from '@algolia/search-client/src/methods/index/getSettings';
import { getSynonym, HasGetSynonym } from '@algolia/search-client/src/methods/index/getSynonym';
import {
  HasPartialUpdateObject,
  partialUpdateObject,
} from '@algolia/search-client/src/methods/index/partialUpdateObject';
import {
  HasPartialUpdateObjects,
  partialUpdateObjects,
} from '@algolia/search-client/src/methods/index/partialUpdateObjects';
import {
  HasReplaceAllObjects,
  replaceAllObjects,
} from '@algolia/search-client/src/methods/index/replaceAllObjects';
import {
  HasReplaceAllRules,
  replaceAllRules,
} from '@algolia/search-client/src/methods/index/replaceAllRules';
import {
  HasReplaceAllSynonyms,
  replaceAllSynonyms,
} from '@algolia/search-client/src/methods/index/replaceAllSynonyms';
import { HasSaveObject, saveObject } from '@algolia/search-client/src/methods/index/saveObject';
import { HasSaveObjects, saveObjects } from '@algolia/search-client/src/methods/index/saveObjects';
import { HasSaveRule, saveRule } from '@algolia/search-client/src/methods/index/saveRule';
import { HasSaveRules, saveRules } from '@algolia/search-client/src/methods/index/saveRules';
import { HasSaveSynonym, saveSynonym } from '@algolia/search-client/src/methods/index/saveSynonym';
import {
  HasSaveSynonyms,
  saveSynonyms,
} from '@algolia/search-client/src/methods/index/saveSynonyms';
import { HasSearch, search } from '@algolia/search-client/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/search-client/src/methods/index/searchForFacetValues';
import { HasSearchRules, searchRules } from '@algolia/search-client/src/methods/index/searchRules';
import {
  HasSearchSynonyms,
  searchSynonyms,
} from '@algolia/search-client/src/methods/index/searchSynonyms';
import { HasSetSettings, setSettings } from '@algolia/search-client/src/methods/index/setSettings';
import { HasWaitTask, waitTask } from '@algolia/search-client/src/methods/index/waitTask';
import { SearchClientOptions } from '@algolia/search-client/src/SearchClient';
import { SearchIndex as SearchIndexPreset } from '@algolia/search-client/src/SearchIndex';
import { TransporterOptions } from '@algolia/transporter';

export type SearchClient = BaseSearchClient &
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

  const initIndex = base.initIndex;

  return {
    ...base,
    initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
      return initIndex.bind(this)(indexName, {
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
