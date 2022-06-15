import type { TopHitWithAnalytics } from './topHitWithAnalytics';

export type TopHitsResponseWithAnalytics = {
  /**
   * A list of top hits with their count and analytics.
   */
  hits: TopHitWithAnalytics[];
};
