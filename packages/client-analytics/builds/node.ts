import type { Host, Requester } from '@algolia/client-common';
import { createHttpRequester } from '@algolia/requester-node-http';

import { createAnalyticsApi } from '../src/analyticsApi';
import type { AnalyticsApi, Region } from '../src/analyticsApi';

export * from '../src/analyticsApi';

export function analyticsApi(
  appId: string,
  apiKey: string,
  region?: Region,
  options?: { requester?: Requester; hosts?: Host[] }
): AnalyticsApi {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createAnalyticsApi({
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
