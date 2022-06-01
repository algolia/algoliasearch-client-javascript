import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

import { createPredictClient } from '../src/predictClient';
import type { PredictClient, Region } from '../src/predictClient';

export * from '../src/predictClient';

export function predictClient(
  appId: string,
  apiKey: string,
  region: Region,
  options?: InitClientOptions
): PredictClient {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  if (!region) {
    throw new Error('`region` is missing.');
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
