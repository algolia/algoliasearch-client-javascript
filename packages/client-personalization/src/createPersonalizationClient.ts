import {
  addMethods,
  AuthMode,
  ClientTransporterOptions,
  createAuth,
  CreateClient,
} from '@algolia/client-common';
import { createTransporter } from '@algolia/transporter';

import { PersonalizationClient, PersonalizationClientOptions } from '.';

export const createPersonalizationClient: CreateClient<
  PersonalizationClient,
  PersonalizationClientOptions & ClientTransporterOptions
> = options => {
  const region = options.region || 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = createTransporter({
    hosts: [{ url: `personalization.${region}.algolia.com` }],
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

  return addMethods({ appId: options.appId, transporter }, options.methods);
};
