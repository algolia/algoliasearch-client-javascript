import { createNullCache } from '@algolia/cache-common/createNullCache';
import { LogLevelEnum } from '@algolia/logger-common/types/LogLevelType';
import { createConsoleLogger } from '@algolia/logger-console/createConsoleLogger';
import { createNodeHttpRequester } from '@algolia/requester-node-http/createNodeHttpRequester';
import { createUserAgent } from '@algolia/transporter/createUserAgent';

import { createSearchClient, SearchClient } from '../presets/default';
import { AlgoliaSearchOptions } from '../types/AlgoliaSearchOptions';

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
    logger: createConsoleLogger(
      options.logLevel === undefined ? LogLevelEnum.Error : options.logLevel
    ),
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
    hostsCache: createNullCache(),
    userAgent: createUserAgent('4.0.0-alpha.0').with({
      segment: 'Node.js',
      version: process.versions.node,
    }),
  });
}

export * from '../index';
