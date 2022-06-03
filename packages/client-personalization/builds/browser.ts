import type { InitClientOptions } from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createFallbackableCache,
  createBrowserLocalStorageCache,
} from '@experimental-api-clients-automation/client-common';
import { createXhrRequester } from '@experimental-api-clients-automation/requester-browser-xhr';

import type {
  PersonalizationClient,
  Region,
} from '../src/personalizationClient';
import {
  createPersonalizationClient,
  apiClientVersion,
  REGIONS,
} from '../src/personalizationClient';

export * from '../src/personalizationClient';

export function personalizationClient(
  appId: string,
  apiKey: string,
  region: Region,
  options?: InitClientOptions
): PersonalizationClient {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  if (!region) {
    throw new Error('`region` is missing.');
  }
  if (typeof region !== 'string' || !REGIONS.includes(region)) {
    throw new Error(
      `\`region\` must be one of the following: ${REGIONS.join(', ')}`
    );
  }

  return createPersonalizationClient({
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
