import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createFallbackableCache,
  createBrowserLocalStorageCache,
} from '@experimental-api-clients-automation/client-common';
import { createXhrRequester } from '@experimental-api-clients-automation/requester-browser-xhr';

import {
  createQuerySuggestionsApi,
  apiClientVersion,
} from '../src/querySuggestionsApi';
import type { QuerySuggestionsApi, Region } from '../src/querySuggestionsApi';

export * from '../src/querySuggestionsApi';

export function querySuggestionsApi(
  appId: string,
  apiKey: string,
  region: Region,
  options?: InitClientOptions
): QuerySuggestionsApi {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  if (!region) {
    throw new Error('`region` is missing.');
  }

  return createQuerySuggestionsApi({
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
