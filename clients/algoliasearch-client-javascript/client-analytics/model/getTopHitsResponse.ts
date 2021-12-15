import type { GetTopHitsResponseHits } from './getTopHitsResponseHits';

export type GetTopHitsResponse = {
  /**
   * A list of top hits with their count.
   */
  hits: GetTopHitsResponseHits[];
};
