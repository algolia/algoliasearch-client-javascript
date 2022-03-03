import type { Host, Requester } from '@algolia/client-common';
import { createHttpRequester } from '@algolia/requester-node-http';

import { createQuerySuggestionsApi } from '../src/querySuggestionsApi';
import type { QuerySuggestionsApi, Region } from '../src/querySuggestionsApi';

export * from '../src/querySuggestionsApi';

export function querySuggestionsApi(
  appId: string,
  apiKey: string,
  region: Region,
  options?: { requester?: Requester; hosts?: Host[] }
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
      connect: 2,
      read: 5,
      write: 30,
    },
    requester: options?.requester ?? createHttpRequester(),
    userAgents: [{ segment: 'Node.js', version: process.versions.node }],
    ...options,
  });
}
