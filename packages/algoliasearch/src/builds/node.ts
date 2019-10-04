import { NodeHttpRequester } from '@algolia/requester-node-http';
import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';
import { ConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { search, HasSearch } from '@algolia/search-client/src/methods/index/search';
import {
  searchForFacetValues,
  HasSearchForFacetValues,
} from '@algolia/search-client/src/methods/index/searchForFacetValues';
import { SearchClient as BaseSearchClient } from '@algolia/search-client';
import { NullCache } from '@algolia/cache-types';
import { Options } from '../types';

type SearchIndex = BaseSearchClient & HasSearch & HasSearchForFacetValues;

class SearchClient extends BaseSearchClient {
  public initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
    return super.initIndex(indexName, {
      methods: [search, searchForFacetValues],
    });
  }
}

export default function algoliasearch(
  appId: string,
  apiKey: string,
  options: Options = {}
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

  return new SearchClient({
    appId,
    apiKey,
    transporter,
    userAgent: UserAgent.create('4.0.0-alpha.0').with({
      segment: 'Node.js',
      version: process.versions.node,
    }),
  });
}
