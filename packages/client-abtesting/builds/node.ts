import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

import { createAbtestingClient } from '../src/abtestingClient';
import type { AbtestingClient, Region } from '../src/abtestingClient';

export * from '../src/abtestingClient';

export function abtestingClient(
  appId: string,
  apiKey: string,
  region?: Region,
  options?: InitClientOptions
): AbtestingClient {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createAbtestingClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: 2,
      read: 5,
      write: 30,
    },
    requester: options?.requester ?? createHttpRequester(),
    userAgents: [{ segment: 'Node.js', version: process.versions.node }],
    responsesCache: options?.responsesCache ?? createNullCache(),
    requestsCache: options?.requestsCache ?? createNullCache(),
    hostsCache: options?.hostsCache ?? createMemoryCache(),
    ...options,
  });
}
