import { Auth, AuthMode } from '@algolia/auth';
import { ComposableOptions, compose } from '@algolia/support';
import { Call, Transporter, TransporterOptions } from '@algolia/transporter';

import { SearchClient } from '../../search-client';

export class AnalyticsClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  public readonly searchClient: SearchClient;

  public constructor(
    searchClient: SearchClient,
    options: AnalyticsClientOptions & TransporterOptions
  ) {
    this.appId = options.appId;
    this.searchClient = searchClient;

    const region = options.region !== undefined ? options.region : 'us';
    const auth = new Auth(AuthMode.WithinHeaders, this.appId, options.apiKey);

    this.transporter = new Transporter(options);

    this.transporter.setHosts([{ url: `analytics.${region}.algolia.com`, accept: Call.Any }]);
    this.transporter.addHeaders({
      ...auth.headers(),
      ...{ 'content-type': 'application/json' },
    });
    this.transporter.addQueryParameters(auth.queryParameters());
  }
}

export const createAnalyticsClient = <TAnalyticsClient>(
  searchClient: SearchClient,
  options: AnalyticsClientOptions & TransporterOptions & ComposableOptions
): TAnalyticsClient & AnalyticsClient => {
  const Client = compose<TAnalyticsClient & AnalyticsClient>(
    AnalyticsClient,
    options
  );

  return new Client(searchClient, options);
};

type AnalyticsClientOptions = {
  readonly appId: string;
  readonly apiKey: string;
  readonly region?: string;
};
