import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { AuthMode, version } from '@algolia/client-common';
import { LogLevelEnum } from '@algolia/logger-common';
import { createConsoleLogger } from '@algolia/logger-console';
import { createBrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { createUserAgent } from '@algolia/transporter';

import { createSearchClient, SearchClient } from '../presets/lite';
import { AlgoliaSearchOptions } from '../types';

export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
): SearchClient {
  const logger = createConsoleLogger(
    options.logLevel === undefined ? LogLevelEnum.Error : options.logLevel
  );

  return createSearchClient({
    appId,
    apiKey,
    requester: createBrowserXhrRequester(),
    timeouts: {
      read: 1,
      write: 30,
    },
    logger,
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache(),
    hostsCache: createBrowserLocalStorageCache(logger),
    userAgent: createUserAgent(version).with({ segment: 'Browser', version: 'lite' }),
    authMode: AuthMode.WithinQueryParameters,
  });
}

export * from '../types';
export { SearchIndex, SearchClient } from '../presets/lite';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;
