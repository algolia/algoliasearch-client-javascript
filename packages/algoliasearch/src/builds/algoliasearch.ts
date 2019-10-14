import { AnalyticsClient, createAnalyticsClient } from '@algolia/analytics-client';
import { BrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { InMemoryCache } from '@algolia/cache-in-memory';
import { createInsightsClient, InsightsClient } from '@algolia/insights-client';
import { ConsoleLogger } from '@algolia/logger-console';
import { LogLevel } from '@algolia/logger-types';
import { BrowserXhrRequester } from '@algolia/requester-browser-xhr';
import {
  createSearchClient,
  SearchClient as BaseSearchClient,
  SearchClientOptions,
} from '@algolia/search-client';
import { HasSearch, search } from '@algolia/search-client/src/methods/index/search';
import {
  HasSearchForFacetValues,
  searchForFacetValues,
} from '@algolia/search-client/src/methods/index/searchForFacetValues';
import { Transporter } from '@algolia/transporter';
import { UserAgent } from '@algolia/transporter-types';

import { AlgoliaSearchOptions } from '../types';

type SearchIndex = BaseSearchClient & HasSearch & HasSearchForFacetValues;

class SearchClient extends BaseSearchClient {
  private readonly apiKey: string;

  private readonly userAgent: UserAgent;

  public constructor(options: SearchClientOptions) {
    super(options);

    this.apiKey = options.apiKey;
    this.userAgent = options.userAgent;
  }

  public initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
    return super.initIndex(indexName, {
      methods: [search, searchForFacetValues],
    });
  }

  public initAnalytics(region: string): AnalyticsClient {
    return createAnalyticsClient({
      appId: this.appId,
      apiKey: this.apiKey,
      transporter: this.transporter,
      userAgent: this.userAgent,
      region,
    });
  }

  public initInsights(region: string): InsightsClient {
    return createInsightsClient({
      appId: this.appId,
      apiKey: this.apiKey,
      transporter: this.transporter,
      userAgent: this.userAgent,
      region,
    });
  }
}

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
    userAgent: UserAgent.create('4.0.0-alpha.0').with({ segment: 'Browser' }),
  });
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, functional/immutable-data
(<any>window).algoliasearch = algoliasearch;
