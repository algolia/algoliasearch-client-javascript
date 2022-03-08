import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createFallbackableCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { AuthMode, version } from '@algolia/client-common';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { createUserAgent } from '@algolia/transporter';

import { createRecommendClient } from '../createRecommendClient';
import {
  getFrequentlyBoughtTogether,
  getRecommendations,
  getRelatedProducts,
  getTrendingFacets,
  getTrendingItems,
} from '../methods';
import { BaseRecommendClient, RecommendOptions, WithRecommendMethods } from '../types';

export default function recommend(
  appId: string,
  apiKey: string,
  options?: RecommendOptions
): RecommendClient {
  const commonOptions = {
    appId,
    apiKey,
    timeouts: {
      connect: 1,
      read: 2,
      write: 30,
    },
    requester: createBrowserXhrRequester(),
    logger: createConsoleLogger(LogLevelEnum.Error),
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache({ serializable: false }),
    hostsCache: createFallbackableCache({
      caches: [
        createBrowserLocalStorageCache({ key: `${version}-${appId}` }),
        createInMemoryCache(),
      ],
    }),
    userAgent: createUserAgent(version)
      .add({ segment: 'Recommend', version })
      .add({ segment: 'Browser' }),
    authMode: AuthMode.WithinQueryParameters,
  };

  return createRecommendClient({
    ...commonOptions,
    ...options,
    methods: {
      getFrequentlyBoughtTogether,
      getRecommendations,
      getRelatedProducts,
      getTrendingFacets,
      getTrendingItems,
    },
  });
}

// eslint-disable-next-line functional/immutable-data
recommend.version = version;

export type RecommendClient = WithRecommendMethods<BaseRecommendClient>;

export * from '../types';
