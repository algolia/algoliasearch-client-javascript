import type {
  Region as AbtestingRegion,
  AbtestingClient,
} from '@algolia/client-abtesting/src/abtestingClient';
import {
  createAbtestingClient,
  REGIONS as abtestingRegions,
} from '@algolia/client-abtesting/src/abtestingClient';
import type {
  Region as AnalyticsRegion,
  AnalyticsClient,
} from '@algolia/client-analytics/src/analyticsClient';
import {
  createAnalyticsClient,
  REGIONS as analyticsRegions,
} from '@algolia/client-analytics/src/analyticsClient';
import {
  createMemoryCache,
  createFallbackableCache,
  createBrowserLocalStorageCache,
  DEFAULT_CONNECT_TIMEOUT_BROWSER,
  DEFAULT_READ_TIMEOUT_BROWSER,
  DEFAULT_WRITE_TIMEOUT_BROWSER,
} from '@algolia/client-common';
import type { CreateClientOptions } from '@algolia/client-common';
import {
  createPersonalizationClient,
  REGIONS as personalizationRegions,
} from '@algolia/client-personalization/src/personalizationClient';
import type {
  Region as PersonalizationRegion,
  PersonalizationClient,
} from '@algolia/client-personalization/src/personalizationClient';
import {
  createSearchClient,
  apiClientVersion as searchClientVersion,
} from '@algolia/client-search/src/searchClient';
import { createXhrRequester } from '@algolia/requester-browser-xhr';

import type {
  CommonInitOptions,
  InitRegion,
  CommonClientOptions,
} from './models';

export * from './models';

export const apiClientVersion = searchClientVersion;

export type Algoliasearch = ReturnType<typeof algoliasearch>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function algoliasearch(
  appId: string,
  apiKey: string,
  options?: CommonClientOptions
) {
  if (!appId || typeof appId !== 'string') {
    throw new Error('`appId` is missing.');
  }

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('`apiKey` is missing.');
  }

  const commonOptions: CreateClientOptions = {
    apiKey,
    appId,
    timeouts: {
      connect: DEFAULT_CONNECT_TIMEOUT_BROWSER,
      read: DEFAULT_READ_TIMEOUT_BROWSER,
      write: DEFAULT_WRITE_TIMEOUT_BROWSER,
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
  };

  function initAnalytics(
    initOptions: CommonInitOptions & InitRegion<AnalyticsRegion> = {}
  ): AnalyticsClient {
    if (
      initOptions.region &&
      (typeof initOptions.region !== 'string' ||
        !analyticsRegions.includes(initOptions.region))
    ) {
      throw new Error(
        `\`region\` must be one of the following: ${analyticsRegions.join(
          ', '
        )}`
      );
    }

    return createAnalyticsClient({
      ...commonOptions,
      ...initOptions.options,
      ...initOptions,
    });
  }

  function initAbtesting(
    initOptions: CommonInitOptions & InitRegion<AbtestingRegion> = {}
  ): AbtestingClient {
    if (
      initOptions.region &&
      (typeof initOptions.region !== 'string' ||
        !abtestingRegions.includes(initOptions.region))
    ) {
      throw new Error(
        `\`region\` must be one of the following: ${abtestingRegions.join(
          ', '
        )}`
      );
    }

    return createAbtestingClient({
      ...commonOptions,
      ...initOptions.options,
      ...initOptions,
    });
  }

  function initPersonalization(
    initOptions: CommonInitOptions & Required<InitRegion<PersonalizationRegion>>
  ): PersonalizationClient {
    if (!initOptions.region) {
      throw new Error('`region` is missing.');
    }

    if (
      initOptions.region &&
      (typeof initOptions.region !== 'string' ||
        !personalizationRegions.includes(initOptions.region))
    ) {
      throw new Error(
        `\`region\` must be one of the following: ${personalizationRegions.join(
          ', '
        )}`
      );
    }

    return createPersonalizationClient({
      ...commonOptions,
      ...initOptions.options,
      ...initOptions,
    });
  }

  return {
    ...createSearchClient(commonOptions),
    /**
     * Get the value of the `algoliaAgent`, used by our libraries internally and telemetry system.
     */
    get _ua(): string {
      return this.transporter.algoliaAgent.value;
    },
    initAnalytics,
    initPersonalization,
    initAbtesting,
  };
}
