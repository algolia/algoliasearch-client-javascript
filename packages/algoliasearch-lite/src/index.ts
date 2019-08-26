import { search, HasSearch } from '@algolia/search-client/src/Methods/SearchIndex/search';
import {
  searchForFacetValues,
  HasSearchForFacetValues,
} from '@algolia/search-client/src/Methods/SearchIndex/searchForFacetValues';
import { SearchClient as BaseSearchClient } from '@algolia/search-client';
import { BrowserXhrRequester } from '@algolia/requester-browser-xhr';
import { Transporter } from '@algolia/transporter';
import { ConsoleLogger } from '@algolia/logger-console';
import { UserAgent } from '@algolia/transporter-types';

class SearchClient extends BaseSearchClient {
  public initIndex<TSearchIndex = HasSearch & HasSearchForFacetValues>(
    indexName: string
  ): TSearchIndex {
    return super.initIndex(indexName, {
      methods: [search, searchForFacetValues],
    });
  }
}

export function algoliasearch(appId: string, apiKey: string): SearchClient {
  const requester = new BrowserXhrRequester();

  const transporter = new Transporter({
    requester,
    logger: new ConsoleLogger(),
    timeouts: {
      read: 1,
      write: 30,
    },
    hosts: [],
    headers: {},
  });

  return new SearchClient({
    appId,
    apiKey,
    transporter,
    userAgent: UserAgent.create('4.0.0-alpha.0').with({ segment: 'Browser', version: 'lite' }),
  });
}
