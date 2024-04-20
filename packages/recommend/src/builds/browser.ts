import { createBrowserLocalStorageCache } from '@sefai/cache-browser-local-storage';
import { createFallbackableCache } from '@sefai/cache-common';
import { createInMemoryCache } from '@sefai/cache-in-memory';
import { AuthMode, version } from '@sefai/client-common';
import { LogLevelEnum } from '@sefai/logger-common';
import { createConsoleLogger } from '@sefai/logger-console';
import { createBrowserXhrRequester } from '@sefai/requester-browser-xhr';
import { createUserAgent } from '@sefai/transporter';

import { createRecommendClient } from '../createRecommendClient';
import {
  getFrequentlyBoughtTogether,
  getLookingSimilar,
  getRecommendations,
  getRecommendedForYou,
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
      getLookingSimilar,
      getRecommendedForYou,
    },
  });
}

/* eslint-disable functional/immutable-data */
recommend.version = version;
recommend.getFrequentlyBoughtTogether = getFrequentlyBoughtTogether;
recommend.getRecommendations = getRecommendations;
recommend.getRelatedProducts = getRelatedProducts;
recommend.getTrendingFacets = getTrendingFacets;
recommend.getTrendingItems = getTrendingItems;
recommend.getLookingSimilar = getLookingSimilar;
recommend.getRecommendedForYou = getRecommendedForYou;
/* eslint-enable functional/immutable-data */

export type RecommendClient = WithRecommendMethods<BaseRecommendClient>;

export * from '../types';
