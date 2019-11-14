import { AuthMode, createAuth, decorate, DecorateOptions } from '@algolia/client-common';
import { CallEnum, createTransporter, TransporterOptions } from '@algolia/transporter';

import { AnalyticsClient, AnalyticsClientOptions } from '.';

export const createAnalyticsClient = <TClient>(
  options: AnalyticsClientOptions & TransporterOptions & DecorateOptions
): AnalyticsClient & TClient => {
  const region = options.region || 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = createTransporter(options);

  transporter.setHosts([{ url: `analytics.${region}.algolia.com`, accept: CallEnum.Any }]);
  transporter.addHeaders({
    ...auth.headers(),
    ...{ 'content-type': 'application/json' },
  });
  transporter.addQueryParameters(auth.queryParameters());

  return decorate<TClient & AnalyticsClient>({ transporter }, options);
};
