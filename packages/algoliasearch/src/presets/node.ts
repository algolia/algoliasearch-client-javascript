import { createAnalyticsClient } from '@algolia/client-analytics';
import {
  assignUserID,
  assignUserIDs,
  createSearchClient as baseCreateSearchClient,
  getUserID,
  HasAssignUserID,
  HasAssignUserIDs,
  HasGetUserID,
  HasSearchUserIDs,
  initIndex,
  SearchClientOptions,
  searchUserIDs,
} from '@algolia/client-search';
import { TransporterOptions } from '@algolia/transporter';

import {
  AnalyticsClient as BrowserAnalyticsClient,
  methods as browserMethods,
  SearchClient as BrowserSearchClient,
  SearchIndex as BrowserSearchIndex,
} from './browser';

export type SearchClient = BrowserSearchClient &
  HasAssignUserID &
  HasAssignUserIDs &
  HasSearchUserIDs &
  HasGetUserID;

export type SearchIndex = BrowserSearchIndex;

export type AnalyticsClient = BrowserAnalyticsClient;

export const methods = {
  searchClient: [
    ...browserMethods.searchClient,
    ...[assignUserID, assignUserIDs, getUserID, searchUserIDs],
  ],
  searchIndex: browserMethods.searchIndex,
  analyticsClient: browserMethods.analyticsClient,
};

export const createSearchClient = (
  options: SearchClientOptions & TransporterOptions
): SearchClient => {
  const base = baseCreateSearchClient<SearchClient>({ ...options, methods: methods.searchClient });

  return {
    ...base,
    initIndex<TSearchIndex = SearchIndex>(indexName: string): TSearchIndex {
      return initIndex(base).initIndex(indexName, {
        methods: methods.searchIndex,
      });
    },
    initAnalytics(region?: string): AnalyticsClient {
      return createAnalyticsClient({
        ...options,
        region,
        methods: methods.analyticsClient,
      });
    },
  };
};
