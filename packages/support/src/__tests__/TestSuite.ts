import { createSearchClient } from '../../../search-client';
import { SearchIndex } from '../../../search-client/src/SearchIndex';
import { Transporter } from '@algolia/transporter';
import { HasSearch, search } from '../../../search-client/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '../../../search-client/src/methods/index/searchForFacetValues';
import { HasWaitTask, waitTask } from '../../../search-client/src/methods/index/waitTask';
import { HasSaveObject, saveObject } from '../../../search-client/src/methods/index/saveObject';
import { HasDelete, deleteIndex } from '../../../search-client/src/methods/index/deleteIndex';
import { HasSaveObjects, saveObjects } from '../../../search-client/src/methods/index/saveObjects';
import { HasGetObject, getObject } from '../../../search-client/src/methods/index/getObject';
import { HasGetObjects, getObjects } from '../../../search-client/src/methods/index/getObjects';
import { HasSetSettings, setSettings } from '../../../search-client/src/methods/index/setSettings';
import { getSettings, HasGetSettings } from '../../../search-client/src/methods/index/getSettings';
import { UserAgent } from '@algolia/transporter-types';
import { batch, HasBatch } from '../../../search-client/src/methods/index/batch';
import { AuthMode } from '@algolia/auth';
import { createAnalyticsClient } from '../../../analytics-client';
import { HasGetABTests, getAbTests } from '../../../analytics-client/src/methods/client/getABTests';
import { HasSendEvents, sendEvents } from '../../../insights-client/src/methods/client/sendEvents';
import { createInsightsClient } from '../../../insights-client';
import {
  multipleBatch,
  HasMultipleBatch,
} from '../../../search-client/src/methods/client/multipleBatch';
import {
  multipleGetObjects,
  HasMultipleGetObjects,
} from '../../../search-client/src/methods/client/multipleGetObjects';
import {
  multipleQueries,
  HasMultipleQueries,
} from '../../../search-client/src/methods/client/multipleQueries';
import {
  partialUpdateObject,
  HasPartialUpdateObject,
} from '../../../search-client/src/methods/index/partialUpdateObject';
import {
  partialUpdateObjects,
  HasPartialUpdateObjects,
} from '../../../search-client/src/methods/index/partialUpdateObjects';
import {
  deleteObject,
  HasDeleteObject,
} from '../../../search-client/src/methods/index/deleteObject';
import { HasDeleteBy, deleteBy } from '../../../search-client/src/methods/index/deleteBy';
import {
  HasDeleteObjects,
  deleteObjects,
} from '../../../search-client/src/methods/index/deleteObjects';
import {
  clearObjects,
  HasClearObjects,
} from '../../../search-client/src/methods/index/clearObjects';
import {
  browseObjects,
  HasBrowseObjects,
} from '../../../search-client/src/methods/index/browseObjects';
import {
  HasGetObjectPosition,
  getObjectPosition,
} from '../../../search-client/src/methods/index/getObjectPosition';
import { findObject, HasFindObject } from '../../../search-client/src/methods/index/findObject';
import { exists, HasExists } from '../../../search-client/src/methods/index/exists';

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

  public makeClient() {
    this.ensureEnvironmentVariables();
    const transporter = this.makeTransporter();

    const authMode =
      // @ts-ignore
      // eslint-disable-next-line no-undef
      testing.environment() === 'node' ? AuthMode.WithinHeaders : AuthMode.WithinQueryParameters;

    type TSearchClient = HasMultipleBatch & HasMultipleGetObjects & HasMultipleQueries;

    return createSearchClient<TSearchClient>({
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_ADMIN_KEY_1}`,
      transporter,
      userAgent: UserAgent.create('4.0.0'),
      authMode,
      methods: [multipleBatch, multipleGetObjects, multipleQueries],
    });
  }

  public makeIndex(indexName?: string) {
    const index = this.makeClient().initIndex<
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
        HasExists
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
