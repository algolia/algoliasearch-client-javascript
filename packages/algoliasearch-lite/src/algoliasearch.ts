import { SearchClient } from './SearchClient';
import { BrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';
import { ConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { InMemoryCache } from '@algolia/cache-in-memory';
import { BrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';

export function algoliasearch(appId: string, apiKey: string): SearchClient {
  const requester = new BrowserXhrRequester();

  const transporter = new Transporter({
    requester,
    timeouts: {
      read: 1,
      write: 30,
    },
    hosts: [],
    headers: {},
    logger: new ConsoleLogger(LogLevel.Error),
    responseCache: new InMemoryCache(),
    requestCache: new InMemoryCache(),
    hostsCache: new BrowserLocalStorageCache(),
  });

  return new SearchClient({
    appId,
    apiKey,
    transporter,
    userAgent: UserAgent.create('4.0.0-alpha.0').with({ segment: 'Browser', version: 'lite' }),
  });
}
