import { createNullCache } from '@algolia/cache-common';
import {
  addMethods,
  AuthMode,
  ClientTransporterOptions,
  createAuth,
  CreateClient,
} from '@algolia/client-common';
import { CallEnum, createTransporter } from '@algolia/transporter';

import { RecommendationClient, RecommendationClientOptions } from '.';

export const createRecommendationClient: CreateClient<
  RecommendationClient,
  RecommendationClientOptions & ClientTransporterOptions
> = options => {
  const region = options.region || 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = createTransporter({
    hosts: [{ url: `recommendation.${region}.algolia.com`, accept: CallEnum.Any }],
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
    // No retry strategy on recommendation client
    hostsCache: createNullCache(),
  });

  return addMethods({ appId: options.appId, transporter }, options.methods);
};
