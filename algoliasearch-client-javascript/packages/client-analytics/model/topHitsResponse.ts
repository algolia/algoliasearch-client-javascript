import type { TopHitsResponseHits } from './topHitsResponseHits';

export type TopHitsResponse = {
  /**
   * A list of top hits with their count.
   */
  hits: TopHitsResponseHits[];
};
