import type { Host, Requester } from '@algolia/client-common';
import { createHttpRequester } from '@algolia/requester-node-http';

import { createAbtestingApi } from '../src/abtestingApi';
import type { AbtestingApi, Region } from '../src/abtestingApi';

export * from '../src/abtestingApi';

export function abtestingApi(
  appId: string,
  apiKey: string,
  region?: Region,
  options?: { requester?: Requester; hosts?: Host[] }
): AbtestingApi {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createAbtestingApi({
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
    ...options,
  });
}
