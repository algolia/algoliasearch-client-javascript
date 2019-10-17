import { createAnalyticsClient } from '@algolia/analytics-client';
import { getAbTests, HasGetABTests } from '@algolia/analytics-client/src/methods/client/getABTests';
import { SearchClient as BaseSearchClient } from '@algolia/search-client';
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
import { compose } from '@algolia/support';
import { UserAgent } from '@algolia/transporter-types';

export type SearchClient = SearchClientPreset &
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
  HasGetLogs;

export type SearchIndex = HasBatch &
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

export type AnalyticsClient = HasGetABTests;

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
  analyticsClient: [getAbTests],
};

export class SearchClientPreset extends BaseSearchClient {
  private readonly apiKey: string;

  private readonly userAgent: UserAgent;

  public constructor(options: SearchClientOptions) {
    super(options);

    this.apiKey = options.apiKey;
    this.userAgent = options.userAgent;
  }

  public initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
    return super.initIndex(indexName, {
      methods: methods.searchIndex,
    });
  }

  public initAnalytics(region?: string): AnalyticsClient {
    return createAnalyticsClient({
      appId: this.appId,
      apiKey: this.apiKey,
      transporter: this.transporter,
      userAgent: this.userAgent,
      region,
      methods: methods.analyticsClient,
    });
  }
}

export const createSearchClient = (options: SearchClientOptions): SearchClient => {
  const Client = compose<SearchClient>(
    SearchClientPreset,
    { methods: methods.searchClient }
  );

  return new Client(options);
};
