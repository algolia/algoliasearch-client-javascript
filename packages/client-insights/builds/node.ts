import type { Host, Requester } from '@algolia/client-common';
import { HttpRequester } from '@algolia/requester-node-http';

import { createInsightsApi } from '../src/insightsApi';
import type { InsightsApi, Region } from '../src/insightsApi';

export * from '../src/insightsApi';

export function insightsApi(
  appId: string,
  apiKey: string,
  region?: Region,
  options?: { requester?: Requester; hosts?: Host[] }
): InsightsApi {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createInsightsApi({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: 2,
      read: 5,
      write: 30,
    },
    requester: options?.requester ?? new HttpRequester(),
    userAgents: [{ segment: 'Node.js', version: process.versions.node }],
    ...options,
  });
}
