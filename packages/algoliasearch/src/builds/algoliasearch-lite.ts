import { AuthMode } from '@algolia/auth';
import { BrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';
import { ConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { InMemoryCache } from '@algolia/cache-in-memory';
import { BrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { search, HasSearch } from '@algolia/search-client/src/methods/index/search';
import {
  searchForFacetValues,
  HasSearchForFacetValues,
} from '@algolia/search-client/src/methods/index/searchForFacetValues';
import { SearchClient as BaseSearchClient } from '@algolia/search-client';

type SearchIndex = BaseSearchClient & HasSearch & HasSearchForFacetValues;

class SearchClient extends BaseSearchClient {
  public initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
    return super.initIndex(indexName, {
      methods: [search, searchForFacetValues],
    });
  }
}

export default function algoliasearch(appId: string, apiKey: string): SearchClient {
  const requester = new BrowserXhrRequester();

  const transporter = new Transporter({
    requester,
    timeouts: {
      read: 1,
      write: 30,
    },
    logger: new ConsoleLogger(LogLevel.Error),
    responsesCache: new InMemoryCache(),
    requestsCache: new InMemoryCache(),
    hostsCache: new BrowserLocalStorageCache(),
  });

  return new SearchClient({
    appId,
    apiKey,
    transporter,
    userAgent: UserAgent.create('4.0.0-alpha.0').with({ segment: 'Browser', version: 'lite' }),
    authMode: AuthMode.WithinQueryParameters,
  });
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;
