import type { Host, Requester } from '@algolia/client-common';
import { createXhrRequester } from '@algolia/requester-browser-xhr';

import { createRecommendApi } from '../src/recommendApi';
import type { RecommendApi } from '../src/recommendApi';

export * from '../src/recommendApi';

export function recommendApi(
  appId: string,
  apiKey: string,
  options?: { requester?: Requester; hosts?: Host[] }
): RecommendApi {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createRecommendApi({
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
