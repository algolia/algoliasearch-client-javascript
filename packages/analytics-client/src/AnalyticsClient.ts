import { Transporter, Host, Call, UserAgent } from '@algolia/transporter-types';
import { compose, ComposableOptions } from '@algolia/support';
import { AuthMode, Auth } from '@algolia/auth';

export class AnalyticsClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  public constructor(options: AnalyticsClientOptions) {
    this.appId = options.appId;
    this.transporter = options.transporter;
    this.transporter.hosts = [
      new Host({ url: `analytics.${options.region}.algolia.com`, accept: Call.Any }),
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

export const createAnalyticsClient = <TAnalyticsClient = AnalyticsClient>(
  options: AnalyticsClientOptions & ComposableOptions
): TAnalyticsClient => {
  const Client = compose<TAnalyticsClient>(
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
  readonly region: string;
};
