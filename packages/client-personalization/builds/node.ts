import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  DEFAULT_CONNECT_TIMEOUT_NODE,
  DEFAULT_READ_TIMEOUT_NODE,
  DEFAULT_WRITE_TIMEOUT_NODE,
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

  if (region && (typeof region !== 'string' || !REGIONS.includes(region))) {
    throw new Error(
      `\`region\` must be one of the following: ${REGIONS.join(', ')}`
    );
  }

  return createPersonalizationClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: DEFAULT_CONNECT_TIMEOUT_NODE,
      read: DEFAULT_READ_TIMEOUT_NODE,
      write: DEFAULT_WRITE_TIMEOUT_NODE,
    },
    requester: createHttpRequester(),
    algoliaAgents: [{ segment: 'Node.js', version: process.versions.node }],
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
    hostsCache: createMemoryCache(),
    ...options,
  });
}
