import { SearchClient } from '../..';
import { SearchIndex } from '../SearchIndex';
import { Transporter } from '@algolia/transporter';
import { HasSearch, search } from '../methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '../methods/index/searchForFacetValues';
import { HasWaitTask, waitTask } from '../methods/index/waitTask';
import { HasSaveObject, saveObject } from '../methods/index/saveObject';
import { HasDelete, deleteIndex } from '../methods/index/deleteIndex';
import { HasSaveObjects, saveObjects } from '../methods/index/saveObjects';
import { HasGetObject, getObject } from '../methods/index/getObject';
import { HasGetObjects, getObjects } from '../methods/index/getObjects';
import { HasSetSettings, setSettings } from '../methods/index/setSettings';
import { getSettings, HasGetSettings } from '../methods/index/getSettings';
import { UserAgent } from '@algolia/transporter-types';
import { batch, HasBatch } from '../methods/index/batch';
import { AuthMode } from '@algolia/auth';

export class TestSuite {
  public readonly testName: string;

  public indices: Array<SearchIndex & HasDelete>;

  public async cleanUp(): Promise<void> {
    for (const index of this.indices) {
      await index.delete().wait();
    }
  }

  public constructor(testName: string) {
    this.testName = testName;
    this.indices = [];
  }

  public makeIndex(indexName?: string) {
    const transporter = new Transporter({
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

    this.ensureEnvironmentVariables();

    const authMode =
      // @ts-ignore
      // eslint-disable-next-line no-undef
      testing.environment() === 'node' ? AuthMode.WithinHeaders : AuthMode.WithinQueryParameters;

    const client = new SearchClient({
      appId: `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      apiKey: `${process.env.ALGOLIA_ADMIN_KEY_1}`,
      transporter,
      userAgent: UserAgent.create('4.0.0'),
      authMode,
    });

    const index = client.initIndex<
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
        HasGetSettings
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
      ],
    });

    this.indices.push(index);

    return index;
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
