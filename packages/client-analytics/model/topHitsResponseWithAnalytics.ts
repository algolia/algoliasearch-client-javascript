import type { TopHitsResponseWithAnalyticsHits } from './topHitsResponseWithAnalyticsHits';

export type TopHitsResponseWithAnalytics = {
  /**
   * A list of top hits with their count and analytics.
   */
  hits: TopHitsResponseWithAnalyticsHits[];
};
