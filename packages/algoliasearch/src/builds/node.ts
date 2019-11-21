import { createNullCache } from '@algolia/cache-common';
import { createAnalyticsClient } from '@algolia/client-analytics';
import { addMethods, version } from '@algolia/client-common';
import { createSearchClient, initIndex } from '@algolia/client-search';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createNodeHttpRequester } from '@algolia/requester-node-http';
import { createUserAgent } from '@algolia/transporter';

import { methods } from '../presets/node';
import { AlgoliaSearchOptions } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
) {
  const clientOptions = {
    appId,
    apiKey,
    timeouts: {
      read: 2,
      write: 30,
    },
    requester: createNodeHttpRequester(),
    logger: createConsoleLogger(options.logLevel || LogLevelEnum.Error),
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
    hostsCache: createNullCache(),
    userAgent: createUserAgent(version).add({
      segment: 'Node.js',
      version: process.versions.node,
    }),
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
