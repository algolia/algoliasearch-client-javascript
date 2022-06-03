import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

import { createRecommendClient } from '../src/recommendClient';
import type { RecommendClient } from '../src/recommendClient';

export * from '../src/recommendClient';

export function recommendClient(
  appId: string,
  apiKey: string,
  options?: InitClientOptions
): RecommendClient {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  return createRecommendClient({
    appId,
    apiKey,
    timeouts: {
      connect: 2,
      read: 5,
      write: 30,
    },
    requester: createHttpRequester(),
    algoliaAgents: [{ segment: 'Node.js', version: process.versions.node }],
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
    hostsCache: createMemoryCache(),
    ...options,
  });
}
