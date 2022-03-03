import type { SynonymHit } from './synonymHit';

export type SearchSynonymsResponse = {
  /**
   * Array of synonym objects.
   */
  hits: SynonymHit[];
  /**
   * Number of hits that the search query matched.
   */
  nbHits: number;
};
