import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

import type { PredictClient, Region } from '../src/predictClient';
import { createPredictClient, REGIONS } from '../src/predictClient';

export * from '../src/predictClient';

export function predictClient(
  appId: string,
  apiKey: string,
  region: Region,
  options?: InitClientOptions
): PredictClient {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  if (!region) {
    throw new Error('`region` is missing.');
  }
  if (typeof region !== 'string' || !REGIONS.includes(region)) {
    throw new Error(
      `\`region\` must be one of the following: ${REGIONS.join(', ')}`
    );
  }

  return createPredictClient({
    appId,
    apiKey,
    region,
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
