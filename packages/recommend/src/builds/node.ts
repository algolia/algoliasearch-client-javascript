import { createNullCache } from '@sefai/cache-common';
import { createInMemoryCache } from '@sefai/cache-in-memory';
import { destroy, version } from '@sefai/client-common';
import { createNullLogger } from '@sefai/logger-common';
import { Destroyable } from '@sefai/requester-common';
import { createFetchRequester } from '@sefai/requester-fetch';
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
      connect: 2,
      read: 5,
      write: 30,
    },
    requester: createFetchRequester(),
    logger: createNullLogger(),
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
    hostsCache: createInMemoryCache(),
    userAgent: createUserAgent(version)
      .add({ segment: 'Recommend', version })
      .add({ segment: 'Node.js', version: process.versions.node }),
  };

  return createRecommendClient({
    ...commonOptions,
    ...options,
    methods: {
      destroy,
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

export type RecommendClient = WithRecommendMethods<BaseRecommendClient> & Destroyable;

export * from '../types';
