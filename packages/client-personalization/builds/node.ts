import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

import type {
  PersonalizationClient,
  Region,
} from '../src/personalizationClient';
import {
  createPersonalizationClient,
  REGIONS,
} from '../src/personalizationClient';

export {
  apiClientVersion,
  PersonalizationClient,
} from '../src/personalizationClient';
export * from '../model';

export function personalizationClient(
  appId: string,
  apiKey: string,
  region: Region,
  options?: InitClientOptions
): PersonalizationClient {
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

  return createPersonalizationClient({
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
