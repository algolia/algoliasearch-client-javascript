import type {
  Host,
  Requester,
} from '@experimental-api-clients-automation/client-common';
import { createXhrRequester } from '@experimental-api-clients-automation/requester-browser-xhr';

import { createInsightsApi } from '../src/insightsApi';
import type { InsightsApi, Region } from '../src/insightsApi';

export * from '../src/insightsApi';

export function insightsApi(
  appId: string,
  apiKey: string,
  region?: Region,
  options?: { requester?: Requester; hosts?: Host[] }
): InsightsApi {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createInsightsApi({
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
    ...options,
  });
}
