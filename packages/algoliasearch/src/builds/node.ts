import { createNullCache } from '@algolia/cache-types';
import { createConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { createNodeHttpRequester } from '@algolia/requester-node-http';
import { createUserAgent } from '@algolia/transporter';

import { createSearchClient } from '../presets/default';
import { AlgoliaSearchOptions } from '../types/AlgoliaSearchOptions';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
) {
  return createSearchClient({
    appId,
    apiKey,
    timeouts: {
      read: 2,
      write: 30,
    },
    requester: createNodeHttpRequester(),
    logger: createConsoleLogger(options.logLevel === undefined ? LogLevel.Error : options.logLevel),
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
    hostsCache: createNullCache(),
    userAgent: createUserAgent('4.0.0-alpha.0').with({
      segment: 'Node.js',
      version: process.versions.node,
    }),
  });
}
