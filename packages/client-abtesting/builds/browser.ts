import type { Host, Requester } from '@algolia/client-common';
import { XhrRequester } from '@algolia/requester-browser-xhr';

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
