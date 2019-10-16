import { AuthMode } from '@algolia/auth';
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
  HasSetPersonalizationStrategy,
  setPersonalizationStrategy,
} from '@algolia/search-client/src/methods/client/setPersonalizationStrategy';
import {
  clearSynonyms,
  HasClearSynonyms,
} from '@algolia/search-client/src/methods/index/clearSynonyms';
import {
  deleteSynonym,
  HasDeleteSynonym,
} from '@algolia/search-client/src/methods/index/deleteSynonym';
import {
  HasReplaceAllObjects,
  replaceAllObjects,
} from '@algolia/search-client/src/methods/index/replaceAllObjects';
import {
  HasReplaceAllSynonyms,
  replaceAllSynonyms,
} from '@algolia/search-client/src/methods/index/replaceAllSynonyms';
import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';

import { createAnalyticsClient } from '../../../analytics-client';
import { getAbTests, HasGetABTests } from '../../../analytics-client/src/methods/client/getABTests';
import { createInsightsClient } from '../../../insights-client';
import { HasSendEvents, sendEvents } from '../../../insights-client/src/methods/client/sendEvents';
import { createSearchClient } from '../../../search-client';
import {
  HasMultipleBatch,
  multipleBatch,
} from '../../../search-client/src/methods/client/multipleBatch';
import {
  HasMultipleGetObjects,
  multipleGetObjects,
} from '../../../search-client/src/methods/client/multipleGetObjects';
import {
  HasMultipleQueries,
  multipleQueries,
} from '../../../search-client/src/methods/client/multipleQueries';
import { batch, HasBatch } from '../../../search-client/src/methods/index/batch';
import {
  browseObjects,
  HasBrowseObjects,
} from '../../../search-client/src/methods/index/browseObjects';
import { browseRules, HasBrowseRules } from '../../../search-client/src/methods/index/browseRules';
import {
  browseSynonyms,
  HasBrowseSynonyms,
} from '../../../search-client/src/methods/index/browseSynonyms';
import {
  clearObjects,
  HasClearObjects,
} from '../../../search-client/src/methods/index/clearObjects';
import { clearRules, HasClearRules } from '../../../search-client/src/methods/index/clearRules';
import { deleteBy, HasDeleteBy } from '../../../search-client/src/methods/index/deleteBy';
import { deleteIndex, HasDelete } from '../../../search-client/src/methods/index/deleteIndex';
import {
  deleteObject,
  HasDeleteObject,
} from '../../../search-client/src/methods/index/deleteObject';
import {
  deleteObjects,
  HasDeleteObjects,
} from '../../../search-client/src/methods/index/deleteObjects';
import { deleteRule, HasDeleteRule } from '../../../search-client/src/methods/index/deleteRule';
import { exists, HasExists } from '../../../search-client/src/methods/index/exists';
import { findObject, HasFindObject } from '../../../search-client/src/methods/index/findObject';
import { getObject, HasGetObject } from '../../../search-client/src/methods/index/getObject';
import {
  getObjectPosition,
  HasGetObjectPosition,
} from '../../../search-client/src/methods/index/getObjectPosition';
import { getObjects, HasGetObjects } from '../../../search-client/src/methods/index/getObjects';
import { getRule, HasGetRule } from '../../../search-client/src/methods/index/getRule';
import { getSettings, HasGetSettings } from '../../../search-client/src/methods/index/getSettings';
import { getSynonym, HasGetSynonym } from '../../../search-client/src/methods/index/getSynonym';
import {
  HasPartialUpdateObject,
  partialUpdateObject,
} from '../../../search-client/src/methods/index/partialUpdateObject';
import {
  HasPartialUpdateObjects,
  partialUpdateObjects,
} from '../../../search-client/src/methods/index/partialUpdateObjects';
import {
  HasReplaceAllRules,
  replaceAllRules,
} from '../../../search-client/src/methods/index/replaceAllRules';
import { HasSaveObject, saveObject } from '../../../search-client/src/methods/index/saveObject';
import { HasSaveObjects, saveObjects } from '../../../search-client/src/methods/index/saveObjects';
import { HasSaveRule, saveRule } from '../../../search-client/src/methods/index/saveRule';
import { HasSaveRules, saveRules } from '../../../search-client/src/methods/index/saveRules';
import { HasSaveSynonym, saveSynonym } from '../../../search-client/src/methods/index/saveSynonym';
import {
  HasSaveSynonyms,
  saveSynonyms,
} from '../../../search-client/src/methods/index/saveSynonyms';
import { HasSearch, search } from '../../../search-client/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '../../../search-client/src/methods/index/searchForFacetValues';
import { HasSearchRules, searchRules } from '../../../search-client/src/methods/index/searchRules';
import {
  HasSearchSynonyms,
  searchSynonyms,
} from '../../../search-client/src/methods/index/searchSynonyms';
import { HasSetSettings, setSettings } from '../../../search-client/src/methods/index/setSettings';
import { HasWaitTask, waitTask } from '../../../search-client/src/methods/index/waitTask';
import { SearchIndex } from '../../../search-client/src/SearchIndex';

export class TestSuite {
  public readonly testName: string;

  public indices: Array<SearchIndex & HasDelete>;

  public async cleanUp(): Promise<void> {
    for (const index of this.indices) {
      // Indices must by deleted sequencially and waiting..
      await index.delete().wait();
    }
  }

  public constructor(testName: string) {
    this.testName = testName;
    this.indices = [];
  }

  public makeSearchClient() {
    this.ensureEnvironmentVariables();
    const transporter = this.makeTransporter();

    const authMode =
      // @ts-ignore
      // eslint-disable-next-line no-undef
      testing.environment() === 'node' ? AuthMode.WithinHeaders : AuthMode.WithinQueryParameters;

    type TSearchClient = HasMultipleBatch &
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

    return createSearchClient<TSearchClient>({
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_ADMIN_KEY_1}`,
      transporter,
      userAgent: UserAgent.create('4.0.0'),
      authMode,
      methods: [
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
    });
  }

  public makeIndex(indexName?: string) {
    const index = this.makeSearchClient().initIndex<
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
        HasClearRules
    >(indexName === undefined ? this.makeIndexName() : indexName, {
      methods: [
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
    });

    this.indices.push(index);

    return index;
  }

  public makeAnalytics() {
    const transporter = this.makeTransporter();

    this.ensureEnvironmentVariables();

    type TAnalyticsClient = HasGetABTests;

    return createAnalyticsClient<TAnalyticsClient>({
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_ADMIN_KEY_1}`,
      transporter,
      userAgent: UserAgent.create('4.0.0'),
      region: 'us',
      methods: [getAbTests],
    });
  }

  public makeInsights() {
    const transporter = this.makeTransporter();

    this.ensureEnvironmentVariables();

    type TInsightsClient = HasSendEvents;

    return createInsightsClient<TInsightsClient>({
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_ADMIN_KEY_1}`,
      transporter,
      userAgent: UserAgent.create('4.0.0'),
      region: 'us',
      methods: [sendEvents],
    });
  }

  private makeTransporter(): Transporter {
    return new Transporter({
      // @ts-ignore
      // eslint-disable-next-line no-undef
      requester: testing.requester(),

      // @ts-ignore
      // eslint-disable-next-line no-undef
      requestsCache: testing.requestsCache(),

      // @ts-ignore
      // eslint-disable-next-line no-undef
      hostsCache: testing.hostsCache(),
      // @ts-ignore
      // eslint-disable-next-line no-undef
      responsesCache: testing.responsesCache(),
      timeouts: {
        read: 2,
        write: 30,
      },
      hosts: [],
      headers: {},
    });
  }

  private makeIndexName(): string {
    const date = new Date();

    const jobNumber = process.env.CIRCLE_BUILD_NUM ? process.env.CIRCLE_BUILD_NUM : 'unknown';

    const nodeVersion = process.versions.node;

    return (
      `javascript_${date.getFullYear()}` +
      `-${`0${date.getMonth() + 1}`.slice(-2)}` +
      `-${`0${date.getDate()}`.slice(-2)}` +
      `_${`0${date.getHours()}`.slice(-2)}` +
      `:${`0${date.getMinutes()}`.slice(-2)}` +
      `:${`0${date.getSeconds()}`.slice(-2)}` +
      // @ts-ignore
      // eslint-disable-next-line no-undef
      `_${testing.environment()}` +
      `_${nodeVersion}` +
      `_${jobNumber}` +
      `_${`${this.testName}_${this.indices.length}`}`
    );
  }

  private ensureEnvironmentVariables(): void {
    if (
      process.env.ALGOLIA_APPLICATION_ID_1 === undefined ||
      process.env.ALGOLIA_ADMIN_KEY_1 === undefined
    ) {
      throw new Error('You must setup `ALGOLIA_APPLICATION_ID_1` and `ALGOLIA_ADMIN_KEY_1`');
    }
  }
}
