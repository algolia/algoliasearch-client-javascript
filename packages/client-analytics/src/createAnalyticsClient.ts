import { AuthMode, ComposableOptions, compose, createAuth } from '@algolia/client-common';
import { CallEnum, createTransporter, TransporterOptions } from '@algolia/transporter';

import { AnalyticsClient } from '.';

export const createAnalyticsClient = <TClient>(
  options: AnalyticsClientOptions & TransporterOptions & ComposableOptions
): AnalyticsClient & TClient => {
  const region = options.region !== undefined ? options.region : 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = createTransporter(options);

  transporter.setHosts([{ url: `analytics.${region}.algolia.com`, accept: CallEnum.Any }]);
  transporter.addHeaders({
    ...auth.headers(),
    ...{ 'content-type': 'application/json' },
  });
  transporter.addQueryParameters(auth.queryParameters());

  return compose<TClient & AnalyticsClient>(
    { transporter },
    options
  );
};

type AnalyticsClientOptions = {
  readonly appId: string;
  readonly apiKey: string;
  readonly region?: string;
};
