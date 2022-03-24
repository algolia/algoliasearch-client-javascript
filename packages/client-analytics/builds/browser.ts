import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createFallbackableCache,
  createBrowserLocalStorageCache,
} from '@experimental-api-clients-automation/client-common';
import { createXhrRequester } from '@experimental-api-clients-automation/requester-browser-xhr';

import { createAnalyticsApi, apiClientVersion } from '../src/analyticsApi';
import type { AnalyticsApi, Region } from '../src/analyticsApi';

export * from '../src/analyticsApi';

export function analyticsApi(
  appId: string,
  apiKey: string,
  region?: Region,
  options?: InitClientOptions
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
    requester: options?.requester ?? createXhrRequester(),
    userAgents: [{ segment: 'Browser' }],
    authMode: 'WithinQueryParameters',
    responsesCache: options?.responsesCache ?? createMemoryCache(),
    requestsCache:
      options?.requestsCache ?? createMemoryCache({ serializable: false }),
    hostsCache:
      options?.hostsCache ??
      createFallbackableCache({
        caches: [
          createBrowserLocalStorageCache({
            key: `${apiClientVersion}-${appId}`,
          }),
          createMemoryCache(),
        ],
      }),
    ...options,
  });
}
