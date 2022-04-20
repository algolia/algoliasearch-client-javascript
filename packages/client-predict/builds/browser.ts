import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createFallbackableCache,
  createBrowserLocalStorageCache,
} from '@experimental-api-clients-automation/client-common';
import { createXhrRequester } from '@experimental-api-clients-automation/requester-browser-xhr';

import { createPredictClient, apiClientVersion } from '../src/predictClient';
import type { PredictClient } from '../src/predictClient';

export * from '../src/predictClient';

export function predictClient(
  appId: string,
  apiKey: string,
  options?: InitClientOptions
): PredictClient {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createPredictClient({
    appId,
    apiKey,
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
