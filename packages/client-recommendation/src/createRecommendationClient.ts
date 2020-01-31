import {
  addMethods,
  AuthMode,
  ClientTransporterOptions,
  createAuth,
  CreateClient,
} from '@algolia/client-common';
import { createTransporter } from '@algolia/transporter';

import { RecommendationClient, RecommendationClientOptions } from '.';

export const createRecommendationClient: CreateClient<
  RecommendationClient,
  RecommendationClientOptions & ClientTransporterOptions
> = options => {
  const region = options.region || 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = createTransporter({
    hosts: [{ url: `recommendation.${region}.algolia.com` }],
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
