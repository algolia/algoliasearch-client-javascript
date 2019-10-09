import { Transporter, Host, Call, UserAgent } from '@algolia/transporter-types';
import { compose, ComposableOptions } from '@algolia/support';
import { AuthMode, Auth } from '@algolia/auth';
import { UserInsightsClient } from './UserInsightsClient';

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

  public user<TUserInsightsClient = UserInsightsClient>(
    userToken: string,
    options?: ComposableOptions
  ): TUserInsightsClient {
    const UserClient = compose<TUserInsightsClient>(
      UserInsightsClient,
      options
    );

    return new UserClient(this, userToken);
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
  /* eslint-disable functional/prefer-readonly-type */
  appId: string;
  apiKey: string;
  transporter: Transporter;
  userAgent: UserAgent;
  region?: string;
};
