import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { version } from '@algolia/client-common';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
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
      read: 1,
      write: 30,
    },
    requester: createBrowserXhrRequester(),
    logger: createConsoleLogger(
      options.logLevel === undefined ? LogLevelEnum.Error : options.logLevel
    ),
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache(),
    hostsCache: createBrowserLocalStorageCache(),
    userAgent: createUserAgent(version).with({ segment: 'Browser' }),
  });
}

export * from '../types';
export { SearchIndex, SearchClient } from '../presets/default';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;
