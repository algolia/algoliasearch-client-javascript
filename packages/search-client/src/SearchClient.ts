import { Transporter, Host, CallType } from '@algolia/transporter-types';
import { SearchIndex } from './SearchIndex';
import { shuffle } from './helpers';

export class SearchClient {
  public readonly appId: string;
  public readonly transporter: Transporter;
  private readonly apiKey: string;

  public constructor(options: { appId: string; apiKey: string; transporter: Transporter }) {
    this.appId = options.appId;
    this.apiKey = options.apiKey;

    this.transporter = options.transporter
      .withHosts(this.createHosts())
      .withHeaders(this.createHeaders());
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

  private createHeaders(): { [key: string]: string } {
    return {
      'X-Algolia-Application-Id': this.appId,
      'X-Algolia-API-Key': this.apiKey,
      'Content-Type': 'application/json',
    };
  }
}
