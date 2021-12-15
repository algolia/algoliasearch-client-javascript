import type { GetTopHitsResponseWithAnalyticsHits } from './getTopHitsResponseWithAnalyticsHits';

export type GetTopHitsResponseWithAnalytics = {
  /**
   * A list of top hits with their count and analytics.
   */
  hits: GetTopHitsResponseWithAnalyticsHits[];
};
