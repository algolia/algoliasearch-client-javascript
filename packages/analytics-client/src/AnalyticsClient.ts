import { Auth, AuthMode } from '@algolia/auth';
import { ComposableOptions, compose } from '@algolia/support';
import { Call, Host, Transporter, UserAgent } from '@algolia/transporter';

export class AnalyticsClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  public constructor(options: AnalyticsClientOptions) {
    this.appId = options.appId;
    this.transporter = options.transporter;

    const region = options.region !== undefined ? options.region : 'us';
    this.transporter.hosts = [
      new Host({ url: `analytics.${region}.algolia.com`, accept: Call.Any }),
    ];

    const auth = new Auth(AuthMode.WithinHeaders, this.appId, options.apiKey);

    this.transporter.headers = {
      ...auth.headers(),
      ...{ 'content-type': 'application/json' },
    };

    this.transporter.queryParameters = {
      ...auth.queryParameters(),
      ...{ 'x-algolia-agent': options.userAgent.value },
    };
  }
}

export const createAnalyticsClient = <TAnalyticsClient>(
  options: AnalyticsClientOptions & ComposableOptions
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
  readonly transporter: Transporter;
  readonly userAgent: UserAgent;
  readonly region?: string;
};
