import algoliasearchForBrowser from '../../../algoliasearch/src/builds/browser';
import algoliasearchForNode, {
  SearchClient,
  SearchIndex,
} from '../../../algoliasearch/src/builds/node';

/* eslint functional/no-class: 0 */
export class TestSuite {
  public readonly testName: string;

  public indices: SearchIndex[];

  public async cleanUp(): Promise<void> {
    for (const index of this.indices) {
      // Indices must by deleted sequencially and waiting..
      await index.delete().wait();
    }
  }

  public constructor(testName: string) {
    this.ensureEnvironmentVariables();

    this.testName = testName;
    this.indices = [];
  }

  public makeSearchClient(
    appIdEnv: string = 'ALGOLIA_APPLICATION_ID_1',
    apiKeyEnv: string = 'ALGOLIA_ADMIN_KEY_1'
  ): SearchClient {
    const algoliasearch =
      // @ts-ignore
      // eslint-disable-next-line no-undef
      testing.environment() === 'node' ? algoliasearchForNode : algoliasearchForBrowser;

    return algoliasearch(`${process.env[appIdEnv]}`, `${process.env[apiKeyEnv]}`);
  }

  public makeIndex(indexName?: string) {
    const index = this.makeSearchClient().initIndex(
      indexName === undefined ? this.makeIndexName() : indexName
    );

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
    // @ts-ignore
    // eslint-disable-next-line no-undef
    const environment = testing.environment();
    const nodeVersion = process.versions.node;
    const jobNumber = process.env.CIRCLE_BUILD_NUM;
    const user = process.env.USER;

    if (jobNumber) {
      return `${environment}_${jobNumber}_${user}`;
    }
    if (user) {
      return `${environment}_${nodeVersion}_${user}`;
    }

    return `${environment}_${nodeVersion}_unknown`;
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
