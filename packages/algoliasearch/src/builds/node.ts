import { createNullCache } from '@algolia/cache-common';
import { version } from '@algolia/client-common';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createNodeHttpRequester } from '@algolia/requester-node-http';
import { createUserAgent } from '@algolia/transporter';

import { createSearchClient, SearchClient } from '../presets/default';
import { AlgoliaSearchOptions } from '../types';

export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
): SearchClient {
  return createSearchClient({
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
    userAgent: createUserAgent(version).with({
      segment: 'Node.js',
      version: process.versions.node,
    }),
  });
}

export * from '../types';
export { SearchIndex, SearchClient } from '../presets/default';
