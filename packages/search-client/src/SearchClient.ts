import { Transporter, Host, Call, UserAgent } from '@algolia/transporter-types';
import { SearchIndex } from './SearchIndex';
import { shuffle } from './helpers';

export class SearchClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  private readonly apiKey: string;

  public constructor(options: {
    readonly appId: string;
    readonly apiKey: string;
    readonly transporter: Transporter;
    readonly userAgent: UserAgent;
  }) {
    this.appId = options.appId;
    this.apiKey = options.apiKey;

    this.transporter = options.transporter;
    this.transporter.hosts = this.createHosts();
    this.transporter.headers = this.createHeaders();
    this.transporter.queryParameters = this.createQueryParameters(options.userAgent);
  }

  public initIndex<TSearchIndex>(
    indexName: string,
    options?: { readonly methods: readonly Function[] }
  ): TSearchIndex {
    // eslint-disable-next-line functional/no-let
    let Index: any = SearchIndex;

    if (options !== undefined) {
      options.methods.forEach((method): void => {
        Index = method(Index);
      });
    }

    return new Index({
      transporter: this.transporter,
      indexName,
    });
  }

  // eslint-disable-next-line functional/prefer-readonly-type
  private createHosts(): Host[] {
    const hosts = [
      { url: `${this.appId}-dsn.algolia.net`, accept: Call.Read },
      { url: `${this.appId}.algolia.net`, accept: Call.Write },
    ];

    return hosts
      .concat(
        shuffle([
          { url: `${this.appId}-1.algolianet.com`, accept: Call.Any },
          { url: `${this.appId}-2.algolianet.com`, accept: Call.Any },
          { url: `${this.appId}-3.algolianet.com`, accept: Call.Any },
        ])
      )
      .map(host => new Host(host));
  }

  private createHeaders(): { readonly [key: string]: string } {
    return {
      'content-type': 'application/x-www-form-urlencoded',
      'x-algolia-api-key': this.apiKey,
      'x-algolia-application-id': this.appId,
    };
  }

  private createQueryParameters(userAgent: UserAgent): { readonly [key: string]: string } {
    return {
      'x-algolia-agent': userAgent.value,
    };
  }
}
