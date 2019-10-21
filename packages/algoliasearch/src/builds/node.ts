import { NullCache } from '@algolia/cache-types';
import { ConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { NodeHttpRequester } from '@algolia/requester-node-http';
import { Transporter, UserAgent } from '@algolia/transporter';

import { createSearchClient, SearchClient } from '../presets/default';
import { AlgoliaSearchOptions } from '../types';

export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
): SearchClient {
  const requester = new NodeHttpRequester();

  const transporter = new Transporter({
    requester,
    timeouts: {
      read: 2,
      write: 30,
    },
    logger: new ConsoleLogger(options.logLevel === undefined ? LogLevel.Error : options.logLevel),
    responsesCache: new NullCache(),
    requestsCache: new NullCache(),
    hostsCache: new NullCache(),
  });

  return createSearchClient({
    appId,
    apiKey,
    transporter,
    userAgent: UserAgent.create('4.0.0-alpha.0').with({
      segment: 'Node.js',
      version: process.versions.node,
    }),
  });
}
