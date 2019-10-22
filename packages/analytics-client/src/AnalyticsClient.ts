import { Auth, AuthMode } from '@algolia/auth';
import { ComposableOptions, compose } from '@algolia/support';
import { Call, Transporter, TransporterOptions } from '@algolia/transporter';

export class AnalyticsClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  public constructor(options: AnalyticsClientOptions & TransporterOptions) {
    this.appId = options.appId;

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
  options: AnalyticsClientOptions & TransporterOptions & ComposableOptions
): TAnalyticsClient & AnalyticsClient => {
  const Client = compose<TAnalyticsClient & AnalyticsClient>(
    AnalyticsClient,
    options
  );

  return new Client(options);
};

type AnalyticsClientOptions = {
  readonly appId: string;
  readonly apiKey: string;
  readonly region?: string;
};
