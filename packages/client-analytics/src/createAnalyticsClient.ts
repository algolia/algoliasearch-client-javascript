import {
  addMethods,
  AuthMode,
  ClientTransporterOptions,
  createAuth,
  CreateClient,
} from '@algolia/client-common';
import { createTransporter } from '@algolia/transporter';

import { AnalyticsClient, AnalyticsClientOptions } from '.';

export const createAnalyticsClient: CreateClient<
  AnalyticsClient,
  AnalyticsClientOptions & ClientTransporterOptions
> = options => {
  const region = options.region || 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = createTransporter({
    hosts: [{ url: `analytics.${region}.algolia.com` }],
    ...options,
    headers: {
      ...auth.headers(),
      ...{ 'content-type': 'application/json' },
      ...options.headers,
    },

    queryParameters: {
      ...auth.queryParameters(),
      ...options.queryParameters,
    },
  });

  const appId = options.appId;

  return addMethods({ appId, transporter }, options.methods);
};
