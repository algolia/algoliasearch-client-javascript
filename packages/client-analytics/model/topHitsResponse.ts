import type { TopHit } from './topHit';

export type TopHitsResponse = {
  /**
   * A list of top hits with their count.
   */
  hits: TopHit[];
};
