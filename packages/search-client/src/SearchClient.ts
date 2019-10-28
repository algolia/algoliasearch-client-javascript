import { Auth, AuthMode, AuthModeType } from '@algolia/auth';
import { ComposableOptions, compose, shuffle } from '@algolia/support';
import { Call, Transporter, TransporterOptions } from '@algolia/transporter';

import { SearchIndex } from './SearchIndex';

export class SearchClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  public constructor(options: SearchClientOptions & TransporterOptions) {
    this.appId = options.appId;
    this.transporter = new Transporter(options);
    this.transporter.setHosts(
      [
        { url: `${this.appId}-dsn.algolia.net`, accept: Call.Read },
        { url: `${this.appId}.algolia.net`, accept: Call.Write },
      ].concat(
        shuffle([
          { url: `${this.appId}-1.algolianet.com`, accept: Call.Any },
          { url: `${this.appId}-2.algolianet.com`, accept: Call.Any },
          { url: `${this.appId}-3.algolianet.com`, accept: Call.Any },
        ])
      )
    );

    const auth = new Auth(
      options.authMode !== undefined ? options.authMode : AuthMode.WithinHeaders,
      this.appId,
      options.apiKey
    );

    this.transporter.addHeaders({
      ...auth.headers(),
      ...{ 'content-type': 'application/x-www-form-urlencoded' },
    });

    this.transporter.addQueryParameters(auth.queryParameters());
  }

  public addAlgoliaAgent(segment: string, version?: string): void {
    this.transporter.addUserAgent(segment, version);
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
}

export const createSearchClient = <TSearchClient>(
  options: SearchClientOptions & TransporterOptions & ComposableOptions
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
  readonly authMode?: AuthModeType;
};
