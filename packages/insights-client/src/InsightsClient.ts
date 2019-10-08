import { Transporter, Host, Call, UserAgent } from '@algolia/transporter-types';
import { compose, ComposableOptions } from '@algolia/support';
import { AuthMode, Auth } from '@algolia/auth';

export class InsightsClient {
  public readonly appId: string;

  public readonly transporter: Transporter;

  public constructor(options: InsightsClientOptions) {
    this.appId = options.appId;
    this.transporter = options.transporter;

    const region = options.region !== undefined ? options.region : 'us';

    this.transporter.hosts = [new Host({ url: `insights.${region}.algolia.io`, accept: Call.Any })];

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

export const createInsightsClient = <TInsightsClient = InsightsClient>(
  options: InsightsClientOptions & ComposableOptions
): TInsightsClient => {
  const Client = compose<TInsightsClient>(
    InsightsClient,
    options
  );

  return new Client(options);
};

type InsightsClientOptions = {
  readonly appId: string;
  readonly apiKey: string;
  readonly transporter: Transporter;
  readonly userAgent: UserAgent;
  readonly region?: string;
};
