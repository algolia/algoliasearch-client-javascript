import { NullCache } from '@algolia/cache-types';
import { ConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { NodeHttpRequester } from '@algolia/requester-node-http';
import { UserAgent } from '@algolia/transporter';

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
    requester: new NodeHttpRequester(),
    logger: new ConsoleLogger(options.logLevel === undefined ? LogLevel.Error : options.logLevel),
    responsesCache: new NullCache(),
    requestsCache: new NullCache(),
    hostsCache: new NullCache(),
    userAgent: UserAgent.create('4.0.0-alpha.0').with({
      segment: 'Node.js',
      version: process.versions.node,
    }),
  });
}
