import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  DEFAULT_CONNECT_TIMEOUT_NODE,
  DEFAULT_READ_TIMEOUT_NODE,
  DEFAULT_WRITE_TIMEOUT_NODE,
  createMemoryCache,
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

import { createAlgoliasearchLiteClient } from '../src/algoliasearchLiteClient';
import type { AlgoliasearchLiteClient } from '../src/algoliasearchLiteClient';

export {
  apiClientVersion,
  AlgoliasearchLiteClient,
} from '../src/algoliasearchLiteClient';
export * from '../model';

export function algoliasearchLiteClient(
  appId: string,
  apiKey: string,
  options?: InitClientOptions
): AlgoliasearchLiteClient {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  return createAlgoliasearchLiteClient({
    appId,
    apiKey,
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
