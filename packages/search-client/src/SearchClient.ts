import { Auth, AuthMode, AuthModeType } from '@algolia/auth';
import { ComposableOptions, compose, shuffle } from '@algolia/support';
import { Call, Host, Transporter, UserAgent } from '@algolia/transporter';

import { SearchIndex } from './SearchIndex';

export class SearchClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  public readonly userAgent: UserAgent;

  public constructor(options: SearchClientOptions) {
    this.appId = options.appId;

    this.transporter = options.transporter;
    this.transporter.hosts = this.createHosts();

    const auth = new Auth(
      options.authMode !== undefined ? options.authMode : AuthMode.WithinHeaders,
      this.appId,
      options.apiKey
    );

    this.userAgent = options.userAgent;

    this.transporter.headers = {
      ...auth.headers(),
      ...{ 'content-type': 'application/x-www-form-urlencoded' },
    };

    this.transporter.queryParameters = {
      ...auth.queryParameters(),
      'x-algolia-agent': this.userAgent.value,
    };
  }

  public addUserAgent(segment: string, version?: string): void {
    // eslint-disable-next-line functional/immutable-data
    this.userAgent = this.userAgent.with({ segment, version });

    // eslint-disable-next-line functional/immutable-data
    this.transporter.queryParameters['x-algolia-agent'] = this.userAgent.value;
  }

  public addAlgoliaAgent(segment: string, version?: string): void {
    this.addUserAgent(segment, version);
  }

  public initIndex<TSearchIndex>(
    indexName: string,
    options?: ComposableOptions
  ): TSearchIndex & SearchIndex {
    const Index = compose<TSearchIndex & SearchIndex>(
      SearchIndex,
      options
    );

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

export const createSearchClient = <TSearchClient>(
  options: SearchClientOptions & ComposableOptions
): TSearchClient & SearchClient => {
  const Client = compose<TSearchClient & SearchClient>(
    SearchClient,
    options
  );

  return new Client(options);
};

export type SearchClientOptions = {
  readonly appId: string;
  readonly apiKey: string;
  readonly transporter: Transporter;
  readonly userAgent: UserAgent;
  readonly authMode?: AuthModeType;
};
