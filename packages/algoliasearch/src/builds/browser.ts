import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { createConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
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
      read: 1,
      write: 30,
    },
    requester: createBrowserXhrRequester(),
    logger: createConsoleLogger(options.logLevel === undefined ? LogLevel.Error : options.logLevel),
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache(),
    hostsCache: createBrowserLocalStorageCache(),
    userAgent: createUserAgent('4.0.0-alpha.0').with({ segment: 'Browser' }),
  });
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;
