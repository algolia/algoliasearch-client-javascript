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
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import type {
  PersonalizationApi,
  Region as PersonalizationRegion,
} from '@experimental-api-clients-automation/client-personalization/src/personalizationApi';
import { createPersonalizationApi } from '@experimental-api-clients-automation/client-personalization/src/personalizationApi';
import { createSearchApi } from '@experimental-api-clients-automation/client-search/src/searchApi';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

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
      connect: 2,
      read: 5,
      write: 30,
    },
    requester: options?.requester ?? createHttpRequester(),
    userAgents: [{ segment: 'Node.js', version: process.versions.node }],
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
    hostsCache: createMemoryCache(),
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
