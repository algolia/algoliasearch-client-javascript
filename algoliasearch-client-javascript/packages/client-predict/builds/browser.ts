import type {
  Host,
  Requester,
} from '@experimental-api-clients-automation/client-common';
import { createXhrRequester } from '@experimental-api-clients-automation/requester-browser-xhr';

import { createPredictApi } from '../src/predictApi';
import type { PredictApi } from '../src/predictApi';

export * from '../src/predictApi';

export function predictApi(
  appId: string,
  apiKey: string,
  options?: { requester?: Requester; hosts?: Host[] }
): PredictApi {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  return createPredictApi({
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
