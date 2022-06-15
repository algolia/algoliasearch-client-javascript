import type { TopSearchWithAnalytics } from './topSearchWithAnalytics';

export type TopSearchesResponseWithAnalytics = {
  /**
   * A list of top searches with their count and analytics.
   */
  searches: TopSearchWithAnalytics[];
};
