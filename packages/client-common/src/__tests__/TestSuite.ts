import {
  deleteIndex,
  findObject,
  getObjectPosition,
  multipleBatch,
  multipleGetObjects,
  saveObjects,
  setSettings,
} from '@algolia/client-search';

import { addMethods } from '..';
import algoliasearchForBrowser from '../../../algoliasearch/src/builds/browser';
import algoliasearchForBrowserLite from '../../../algoliasearch/src/builds/browserLite';
import algoliasearchForNode from '../../../algoliasearch/src/builds/node';

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

  public indicesCount = 0;

  public constructor(testName?: string) {
    this.ensureEnvironmentVariables();

    this.testName = testName || '';
  }

  public makeSearchClient(
    appIdEnv: string = 'ALGOLIA_APPLICATION_ID_1',
    apiKeyEnv: string = 'ALGOLIA_ADMIN_KEY_1'
  ) {
    const client = this.algoliasearch(`${process.env[appIdEnv]}`, `${process.env[apiKeyEnv]}`);

    // To ensure `Consistency` during the Common Test Suite, we
    // force the transporter to work with a single host in the
    // list: { dsn:read, dsn:write, host-1, host-2, host-3 }
    client.transporter.hosts = [client.transporter.hosts[2]];

    // Also, since we are targeting always the same host, the
    // server may take a little more than expected to answer.
    // To avoid timeouts we increase the timeouts duration
    // @ts-ignore
    client.transporter.timeouts = {
      connect: 30,
      read: 30,
      write: 30,
    };

    if (testing.isBrowserLite()) {
      return addMethods(client, {
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
    const index = this.makeSearchClient().initIndex(indexName || this.makeIndexName());

    if (testing.isBrowserLite()) {
      return addMethods(index, {
        saveObjects,
        setSettings,
        delete: deleteIndex,
        findObject,
        getObjectPosition,
      });
    }

    return index;
  }

  public makeIndexName(): string {
    this.indicesCount++;

    const instanceName = this.makeInstanceName();
    const dateTime = this.makeDateTime();

    return `javascript_${dateTime}_${instanceName}_${this.testName}_${this.indicesCount}`;
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
    const environment = testing.environment();
    const nodeVersion = process.versions.node;
    const jobNumber = process.env.CIRCLE_BUILD_NUM;
    const user = process.env.USER;

    if (jobNumber) {
      return `${environment}_${nodeVersion}_${jobNumber}`;
    } else if (user) {
      return `${environment}_${nodeVersion}_${user.substring(0, 5)}`;
    }

    return `${environment}_${nodeVersion}_unknown`;
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
