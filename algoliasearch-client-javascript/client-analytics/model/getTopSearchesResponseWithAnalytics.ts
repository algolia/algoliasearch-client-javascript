import type { GetTopSearchesResponseWithAnalyticsSearches } from './getTopSearchesResponseWithAnalyticsSearches';

export type GetTopSearchesResponseWithAnalytics = {
  /**
   * A list of top searches with their count and analytics.
   */
  searches: GetTopSearchesResponseWithAnalyticsSearches[];
};
