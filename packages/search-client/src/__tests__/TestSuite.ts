import { BrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { SearchClient } from '../..';
import { SearchIndex } from '../SearchIndex';
import { Transporter } from '@algolia/transporter';
import { HasSearch, Search } from '../Methods/SearchIndex/Search';
import { ConsoleLogger } from '@algolia/logger-console';
import { WaitTask, HasWaitTask } from '../Methods/SearchIndex/WaitTask';
import { HasSaveObject, SaveObject } from '../Methods/SearchIndex/SaveObject';
import { HasDelete, Delete } from '../Methods/SearchIndex/Delete';

export class TestSuite {
  public readonly testName: string;
  public indices: Array<SearchIndex & HasDelete>;

  public async cleanUp(): Promise<void> {
    for (const index of this.indices) {
      await index.delete();
    }
  }

  public constructor(testName: string) {
    this.testName = testName;
    this.indices = [];
  }

  public makeIndex() {
    const requester = new BrowserXhrRequester();

    const transporter = new Transporter({
      requester,
      logger: new ConsoleLogger(),
      timeouts: {
        read: 2,
        write: 30,
      },
      hosts: [],
      headers: {},
    });

    this.ensureEnvironmentVariables();

    const client = new SearchClient({
      appId: `${process.env.ALGOLIA_APP_ID}`,
      apiKey: `${process.env.ALGOLIA_API_KEY}`,
      transporter,
    });

    const index = client.initIndex<
      HasDelete & HasSearch & HasWaitTask & HasSaveObject
    >(this.makeIndexName(), {
      methods: [Delete, SaveObject, Search, WaitTask],
    });

    this.indices.push(index);

    return index;
  }

  private makeIndexName(): string {
    const date = new Date();

    const travisJobNumber = process.env.TRAVIS_JOB_NUMBER
      ? process.env.TRAVIS_JOB_NUMBER
      : 'unknown';

    return (
      `javascript_${date.getFullYear()}` +
      `-${`0${date.getMonth() + 1}`.slice(-2)}` +
      `-${`0${date.getDate()}`.slice(-2)}` +
      `_${`0${date.getHours()}`.slice(-2)}` +
      `:${`0${date.getMinutes()}`.slice(-2)}` +
      `:${`0${date.getSeconds()}`.slice(-2)}` +
      `_${travisJobNumber}` +
      `_${`${this.testName}_${this.indices.length}`}`
    );
  }

  private ensureEnvironmentVariables(): void {
    if (
      process.env.ALGOLIA_APPLICATION_ID_1 === undefined ||
      process.env.ALGOLIA_ADMIN_KEY_1 === undefined
    ) {
      throw new Error('You must setup `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY`');
    }
  }
}
