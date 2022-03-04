import type { TopSearchesResponseWithAnalyticsSearches } from './topSearchesResponseWithAnalyticsSearches';

export type TopSearchesResponseWithAnalytics = {
  /**
   * A list of top searches with their count and analytics.
   */
  searches: TopSearchesResponseWithAnalyticsSearches[];
};
