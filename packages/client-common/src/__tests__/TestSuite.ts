import {
  deleteIndex,
  findObject,
  getObjectPosition,
  multipleBatch,
  multipleGetObjects,
  saveObjects,
  setSettings,
} from '@algolia/client-search';

import { addMethods, createRetryablePromise } from '..';
import algoliasearchForBrowser from '../../../algoliasearch/src/builds/browser';
import algoliasearchForBrowserLite from '../../../algoliasearch/src/builds/browserLite';
import algoliasearchForNode, { SearchIndex } from '../../../algoliasearch/src/builds/node';

/* eslint functional/no-class: 0 */
export class TestSuite {
  public readonly testName: string;

  public readonly isBrowserLite: boolean = testing.isBrowserLite();

  public readonly isBrowser: boolean = testing.isBrowser();

  // @ts-ignore
  // eslint-disable-next-line no-nested-ternary
  public readonly algoliasearch: typeof algoliasearchForNode = this.isBrowserLite
    ? algoliasearchForBrowserLite
    : this.isBrowser
    ? algoliasearchForBrowser
    : algoliasearchForNode;

  public indices: SearchIndex[];

  public async cleanUp(): Promise<void> {
    for (const index of this.indices) {
      await createRetryablePromise(retry => {
        return index
          .delete()
          .wait()
          .catch((err: Error) => {
            const errAbTest = 'cannot delete with an index under AB testing index as destination';
            if (err.message === errAbTest) {
              return retry();
            }

            throw err;
          });
      });
    }

    this.indices = [];
  }

  public constructor(testName?: string) {
    this.ensureEnvironmentVariables();

    this.testName = testName || '';
    this.indices = [];
  }

  public makeSearchClient(
    appIdEnv: string = 'ALGOLIA_APPLICATION_ID_1',
    apiKeyEnv: string = 'ALGOLIA_ADMIN_KEY_1'
  ) {
    let client = this.algoliasearch(`${process.env[appIdEnv]}`, `${process.env[apiKeyEnv]}`);

    if (testing.isBrowserLite()) {
      // @ts-ignore
      client = addMethods(client, {
        multipleBatch,
        multipleGetObjects,
      });
    }

    return client;
  }

  public makeRecommendationClient(
    appIdEnv: string = 'ALGOLIA_APPLICATION_ID_1',
    apiKeyEnv: string = 'ALGOLIA_ADMIN_KEY_1'
  ) {
    return this.makeSearchClient(appIdEnv, apiKeyEnv).initRecommendation();
  }

  public makeIndex(indexName?: string) {
    let index = this.makeSearchClient().initIndex(indexName || this.makeIndexName());

    if (testing.isBrowserLite()) {
      // @ts-ignore
      index = addMethods(index, {
        saveObjects,
        setSettings,
        delete: deleteIndex,
        findObject,
        getObjectPosition,
      });
    }

    this.indices.push(index);

    return index;
  }

  public makeIndexName(): string {
    const instanceName = this.makeInstanceName();
    const dateTime = this.makeDateTime();

    return `javascript_${dateTime}_${instanceName}_${this.testName}_${this.indices.length}`;
  }

  public makeDateTime(): string {
    const now = new Date();

    const makeTwoDigitsString = function(n: number): string {
      return `0${n}`.slice(-2);
    };

    const date =
      `${now.getFullYear()}-` +
      `${makeTwoDigitsString(now.getMonth() + 1)}-` +
      `${makeTwoDigitsString(now.getDate())}`;

    const time =
      `${makeTwoDigitsString(now.getHours())}:` +
      `${makeTwoDigitsString(now.getMinutes())}:` +
      `${makeTwoDigitsString(now.getSeconds())}`;

    return `${date}-${time}`;
  }

  public makeInstanceName(): string {
    const randomString = Math.random()
      .toString(36)
      .substring(7);
    const environment = testing.environment();
    const nodeVersion = process.versions.node;
    const jobNumber = process.env.CIRCLE_BUILD_NUM;
    const user = process.env.USER;

    if (jobNumber) {
      return `${environment}_${nodeVersion}_${jobNumber}_${randomString}`;
    } else if (user) {
      return `${environment}_${nodeVersion}_${user}_${randomString}`;
    }

    return `${environment}_${nodeVersion}_unknown_${randomString}`;
  }

  private ensureEnvironmentVariables(): void {
    const envs = [
      'ALGOLIA_APPLICATION_ID_1',
      'ALGOLIA_APPLICATION_ID_2',
      'ALGOLIA_ADMIN_KEY_1',
      'ALGOLIA_ADMIN_KEY_2',
      'ALGOLIA_APPLICATION_ID_MCM',
      'ALGOLIA_ADMIN_KEY_MCM',
      'ALGOLIA_SEARCH_KEY_1',
    ];

    envs.forEach(env => {
      if (process.env[env] === undefined) {
        throw new Error(`Missing '${env}' environment variable.`);
      }
    });
  }
}
