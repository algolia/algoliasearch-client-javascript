import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createFallbackableCache,
  createBrowserLocalStorageCache,
} from '@experimental-api-clients-automation/client-common';
import { createXhrRequester } from '@experimental-api-clients-automation/requester-browser-xhr';

import {
  createAnalyticsClient,
  apiClientVersion,
} from '../src/analyticsClient';
import type { AnalyticsClient, Region } from '../src/analyticsClient';

export * from '../src/analyticsClient';

export function analyticsClient(
  appId: string,
  apiKey: string,
  region?: Region,
  options?: InitClientOptions
): AnalyticsClient {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  return createAnalyticsClient({
    appId,
    apiKey,
    region,
    timeouts: {
      connect: 1,
      read: 2,
      write: 30,
    },
    requester: createXhrRequester(),
    algoliaAgents: [{ segment: 'Browser' }],
    authMode: 'WithinQueryParameters',
    responsesCache: createMemoryCache(),
    requestsCache: createMemoryCache({ serializable: false }),
    hostsCache: createFallbackableCache({
      caches: [
        createBrowserLocalStorageCache({ key: `${apiClientVersion}-${appId}` }),
        createMemoryCache(),
      ],
    }),
    ...options,
  });
}
