import type {
  AnalyticsApi,
  Region as AnalyticsRegion,
} from '@experimental-api-clients-automation/client-analytics/src/analyticsApi';
import { createAnalyticsApi } from '@experimental-api-clients-automation/client-analytics/src/analyticsApi';
import type {
  CreateClientOptions,
  Host,
  Requester,
} from '@experimental-api-clients-automation/client-common';
import {
  createMemoryCache,
  createFallbackableCache,
  createBrowserLocalStorageCache,
} from '@experimental-api-clients-automation/client-common';
import type {
  PersonalizationApi,
  Region as PersonalizationRegion,
} from '@experimental-api-clients-automation/client-personalization/src/personalizationApi';
import { createPersonalizationApi } from '@experimental-api-clients-automation/client-personalization/src/personalizationApi';
import {
  createSearchApi,
  apiClientVersion,
} from '@experimental-api-clients-automation/client-search/src/searchApi';
import { createXhrRequester } from '@experimental-api-clients-automation/requester-browser-xhr';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function algoliasearch(
  appId: string,
  apiKey: string,
  options?: { requester?: Requester; hosts?: Host[] }
) {
  if (!appId) {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey) {
    throw new Error('`apiKey` is missing.');
  }

  const commonOptions: Omit<CreateClientOptions, 'apiKey' | 'appId'> = {
    timeouts: {
      connect: 1,
      read: 2,
      write: 30,
    },
    requester: options?.requester ?? createXhrRequester(),
    userAgents: [{ segment: 'Browser' }],
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
  };

  function initAnalytics(
    analyticsAppId: string,
    analyticsApiKey: string,
    region?: AnalyticsRegion,
    analyticsOptions?: { requester?: Requester; hosts?: Host[] }
  ): AnalyticsApi {
    return createAnalyticsApi({
      appId: analyticsAppId,
      apiKey: analyticsApiKey,
      region,
      ...analyticsOptions,
      ...commonOptions,
    });
  }

  function initPersonalization(
    personalizationAppId: string,
    personalizationApiKey: string,
    region: PersonalizationRegion,
    personalizationOptions?: { requester?: Requester; hosts?: Host[] }
  ): PersonalizationApi {
    if (!region) {
      throw new Error('`region` is missing.');
    }

    return createPersonalizationApi({
      appId: personalizationAppId,
      apiKey: personalizationApiKey,
      region,
      ...personalizationOptions,
      ...commonOptions,
    });
  }

  return {
    ...createSearchApi({ appId, apiKey, ...commonOptions }),
    initAnalytics,
    initPersonalization,
  };
}
