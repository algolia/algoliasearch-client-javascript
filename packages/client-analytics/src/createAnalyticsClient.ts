import { addMethods, AuthMode, createAuth, CreateClient } from '@algolia/client-common';
import { CallEnum, createTransporter, TransporterOptions } from '@algolia/transporter';

import { AnalyticsClient, AnalyticsClientOptions } from '.';

export const createAnalyticsClient: CreateClient<
  AnalyticsClient,
  AnalyticsClientOptions & TransporterOptions
> = options => {
  const region = options.region || 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = createTransporter(options);
  const appId = options.appId;

  transporter.setHosts([{ url: `analytics.${region}.algolia.com`, accept: CallEnum.Any }]);
  transporter.addHeaders({
    ...auth.headers(),
    ...{ 'content-type': 'application/json' },
  });
  transporter.addQueryParameters(auth.queryParameters());

  return addMethods({ appId, transporter }, options.methods);
};
