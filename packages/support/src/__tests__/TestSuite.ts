import { HasDelete } from '@algolia/search-client/src/methods/index/deleteIndex';

import algoliasearchForBrowser from '../../../algoliasearch/src/builds/browser';
import algoliasearchForNode from '../../../algoliasearch/src/builds/node';
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
    this.ensureEnvironmentVariables();

    this.testName = testName;
    this.indices = [];
  }

  public makeSearchClient() {
    const algoliasearch =
      // @ts-ignore
      // eslint-disable-next-line no-undef
      testing.environment() === 'node' ? algoliasearchForNode : algoliasearchForBrowser;

    return algoliasearch(
      `${process.env.ALGOLIA_APPLICATION_ID_1}`,
      `${process.env.ALGOLIA_ADMIN_KEY_1}`
    );
  }

  public makeIndex(indexName?: string) {
    const index = this.makeSearchClient().initIndex(
      indexName === undefined ? this.makeIndexName() : indexName
    );

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
