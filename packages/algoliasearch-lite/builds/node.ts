import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

import { createAlgoliasearchLiteClient } from '../src/algoliasearchLiteClient';
import type { AlgoliasearchLiteClient } from '../src/algoliasearchLiteClient';

export * from '../src/algoliasearchLiteClient';

export function algoliasearchLiteClient(
  appId: string,
  apiKey: string,
  options?: InitClientOptions
): AlgoliasearchLiteClient {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createAlgoliasearchLiteClient({
    appId,
    apiKey,
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
