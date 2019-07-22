import { Transporter, Host, CallType } from '@algolia/transporter-types';
import { SearchIndex } from './SearchIndex';
import { shuffle } from './helpers';
import { UserAgent } from '@algolia/transporter-types/src/UserAgent';

export class SearchClient {
  public readonly appId: string;
  public readonly transporter: Transporter;

  private readonly apiKey: string;

  public constructor(options: {
    appId: string;
    apiKey: string;
    transporter: Transporter;
    userAgent: UserAgent;
  }) {
    this.appId = options.appId;
    this.apiKey = options.apiKey;

    this.transporter = options.transporter
      .withHosts(this.createHosts())
      .withHeaders(this.createHeaders(options.userAgent));
  }

  public initIndex<TSearchIndex extends SearchIndex>(
    indexName: string,
    options?: { methods: Function[] }
  ): TSearchIndex {
    let Index: any = SearchIndex;

    if (options) {
      options.methods.forEach((method): void => {
        Index = method(Index);
      });
    }

    return new Index({
      transporter: this.transporter,
      indexName,
    });
  }

  private createHosts(): Host[] {
    const hosts = [
      { url: `${this.appId}-dsn.algolia.net`, accept: CallType.Read },
      { url: `${this.appId}.algolia.net`, accept: CallType.Write },
    ];

    return hosts
      .concat(
        shuffle([
          { url: `${this.appId}-1.algolianet.com`, accept: CallType.Any },
          { url: `${this.appId}-2.algolianet.com`, accept: CallType.Any },
          { url: `${this.appId}-3.algolianet.com`, accept: CallType.Any },
        ])
      )
      .map(host => new Host(host));
  }

  private createHeaders(userAgent: UserAgent): { [key: string]: string } {
    return {
      'X-Algolia-Application-Id': this.appId,
      'X-Algolia-API-Key': this.apiKey,
      'Content-Type': 'application/json',
      'User-Agent': userAgent.value,
    };
  }
}
