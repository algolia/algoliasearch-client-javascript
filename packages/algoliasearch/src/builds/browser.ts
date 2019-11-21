import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { createAnalyticsClient } from '@algolia/client-analytics';
import { addMethods, version } from '@algolia/client-common';
import { createSearchClient, initIndex } from '@algolia/client-search';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { createUserAgent } from '@algolia/transporter';

import { methods } from '../presets/browser';
import { AlgoliaSearchOptions } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
) {
  const logger = createConsoleLogger(options.logLevel || LogLevelEnum.Error);

  const clientOptions = {
    appId,
    apiKey,
    timeouts: {
      read: 1,
      write: 30,
    },
    requester: createBrowserXhrRequester(),
    logger,
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache(),
    hostsCache: createBrowserLocalStorageCache(logger),
    userAgent: createUserAgent(version).add({ segment: 'Browser' }),
  };

  const base = createSearchClient(clientOptions);

  return addMethods(base, {
    ...methods.searchClient,
    initIndex: () => (indexName: string) => {
      return addMethods(initIndex(base)(indexName), methods.searchIndex);
    },
    initAnalytics: () => (region?: string) => {
      return createAnalyticsClient({
        ...clientOptions,
        region,
        methods: methods.analyticsClient,
      });
    },
  });
}

export * from '../types';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;
