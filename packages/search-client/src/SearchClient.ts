import { Transporter, Host, Call, UserAgent } from '@algolia/transporter-types';
import { SearchIndex } from './SearchIndex';
import { shuffle } from './helpers';
import { AuthMode, AuthModeType, Auth } from '@algolia/auth';

export class SearchClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  public constructor(options: {
    readonly appId: string;
    readonly apiKey: string;
    readonly transporter: Transporter;
    readonly userAgent: UserAgent;
    readonly authMode?: AuthModeType;
  }) {
    this.appId = options.appId;

    this.transporter = options.transporter;
    this.transporter.hosts = this.createHosts();

    const auth = new Auth(
      options.authMode !== undefined ? options.authMode : AuthMode.WithinHeaders,
      this.appId,
      options.apiKey
    );

    this.transporter.headers = {
      ...auth.headers(),
      ...{ 'content-type': 'application/x-www-form-urlencoded' },
    };

    this.transporter.queryParameters = {
      ...auth.queryParameters(),
      ...{ 'x-algolia-agent': options.userAgent.value },
    };
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
}
