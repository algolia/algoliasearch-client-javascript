import { createNullCache } from '@algolia/cache-common';
import { addMethods, AuthMode, createAuth, CreateClient } from '@algolia/client-common';
import { CallEnum, createTransporter, TransporterOptions } from '@algolia/transporter';

import { RecommendationClient, RecommendationClientOptions } from '.';

export const createRecommendationClient: CreateClient<
  RecommendationClient,
  RecommendationClientOptions & TransporterOptions
> = options => {
  const region = options.region || 'us';
  const auth = createAuth(AuthMode.WithinHeaders, options.appId, options.apiKey);

  const transporter = createTransporter({
    ...options,
    // No retry strategy on recommendation client
    hostsCache: createNullCache(),
  });

  const appId = options.appId;

  transporter.setHosts([{ url: `recommendation.${region}.algolia.com`, accept: CallEnum.Any }]);
  transporter.addHeaders({
    ...auth.headers(),
    ...{ 'content-type': 'application/json' },
  });
  transporter.addQueryParameters(auth.queryParameters());

  return addMethods({ appId, transporter }, options.methods);
};
