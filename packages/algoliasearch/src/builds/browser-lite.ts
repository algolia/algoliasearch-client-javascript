import { AuthMode } from '@algolia/auth';
import { BrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { InMemoryCache } from '@algolia/cache-in-memory';
import { ConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { BrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';

import { createSearchClient, SearchClient } from '../presets/lite';
import { AlgoliaSearchOptions } from '../types';

export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: AlgoliaSearchOptions = {}
): SearchClient {
  const requester = new BrowserXhrRequester();

  const transporter = new Transporter({
    requester,
    timeouts: {
      read: 1,
      write: 30,
    },
    logger: new ConsoleLogger(options.logLevel === undefined ? LogLevel.Error : options.logLevel),
    responsesCache: new InMemoryCache(),
    requestsCache: new InMemoryCache(),
    hostsCache: new BrowserLocalStorageCache(),
  });

  return createSearchClient({
    appId,
    apiKey,
    transporter,
    userAgent: UserAgent.create('4.0.0-alpha.0').with({ segment: 'Browser', version: 'lite' }),
    authMode: AuthMode.WithinQueryParameters,
  });
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;
