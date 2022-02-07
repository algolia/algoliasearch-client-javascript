import type { Host, Requester } from '@algolia/client-common';
import { XhrRequester } from '@algolia/requester-browser-xhr';

import { createAnalyticsApi } from './src/analyticsApi';
import type { AnalyticsApi, Region } from './src/analyticsApi';

export * from './src/analyticsApi';
export * from '@algolia/client-common';

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
      connect: 1,
      read: 2,
      write: 30,
    },
    requester: options?.requester ?? new XhrRequester(),
    userAgents: [{ segment: 'Browser' }],
    authMode: 'WithinQueryParameters',
    ...options,
  });
}
