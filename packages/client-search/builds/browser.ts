import type { Host, Requester } from '@algolia/client-common';
import { createXhrRequester } from '@algolia/requester-browser-xhr';

import { createSearchApi } from '../src/searchApi';
import type { SearchApi } from '../src/searchApi';

export * from '../src/searchApi';

export function searchApi(
  appId: string,
  apiKey: string,
  options?: { requester?: Requester; hosts?: Host[] }
): SearchApi {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createSearchApi({
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
    ...options,
  });
}
