import { createAuth } from '@algolia/auth';
import { AuthMode } from '@algolia/auth/src/types/AuthModeType';
import { compose } from '@algolia/client-common';
import { ComposableOptions } from '@algolia/client-common/src/types/ComposableOptions';
import { createTransporter } from '@algolia/transporter';
import { CallEnum } from '@algolia/transporter/src/types/CallType';
import { TransporterOptions } from '@algolia/transporter/src/types/TransporterOptions';

import { AnalyticsClient } from './types/AnalyticsClient';

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
