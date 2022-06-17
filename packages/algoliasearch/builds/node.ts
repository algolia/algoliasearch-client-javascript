import type {
  AnalyticsClient,
  Region as AnalyticsRegion,
} from '@experimental-api-clients-automation/client-analytics/src/analyticsClient';
import { createAnalyticsClient } from '@experimental-api-clients-automation/client-analytics/src/analyticsClient';
import type {
  CreateClientOptions,
  Host,
  Requester,
} from '@experimental-api-clients-automation/client-common';
import {
  DEFAULT_CONNECT_TIMEOUT_NODE,
  DEFAULT_READ_TIMEOUT_NODE,
  DEFAULT_WRITE_TIMEOUT_NODE,
  createMemoryCache,
  createNullCache,
} from '@experimental-api-clients-automation/client-common';
import type {
  PersonalizationClient,
  Region as PersonalizationRegion,
} from '@experimental-api-clients-automation/client-personalization/src/personalizationClient';
import { createPersonalizationClient } from '@experimental-api-clients-automation/client-personalization/src/personalizationClient';
import {
  createSearchClient,
  apiClientVersion as searchClientVersion,
} from '@experimental-api-clients-automation/client-search/src/searchClient';
import { createHttpRequester } from '@experimental-api-clients-automation/requester-node-http';

export * from './models';

export const apiClientVersion = searchClientVersion;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function algoliasearch(
  appId: string,
  apiKey: string,
  options?: { requester?: Requester; hosts?: Host[] }
) {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  const commonOptions: Omit<CreateClientOptions, 'apiKey' | 'appId'> = {
    timeouts: {
      connect: DEFAULT_CONNECT_TIMEOUT_NODE,
      read: DEFAULT_READ_TIMEOUT_NODE,
      write: DEFAULT_WRITE_TIMEOUT_NODE,
    },
    requester: options?.requester ?? createHttpRequester(),
    algoliaAgents: [{ segment: 'Node.js', version: process.versions.node }],
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
  ): AnalyticsClient {
    return createAnalyticsClient({
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
  ): PersonalizationClient {
    if (!region) {
      throw new Error('`region` is missing.');
    }

    return createPersonalizationClient({
      appId: personalizationAppId,
      apiKey: personalizationApiKey,
      region,
      ...personalizationOptions,
      ...commonOptions,
    });
  }

  return {
    ...createSearchClient({ appId, apiKey, ...commonOptions }),
    initAnalytics,
    initPersonalization,
  };
}

export type Algoliasearch = ReturnType<typeof algoliasearch>;
