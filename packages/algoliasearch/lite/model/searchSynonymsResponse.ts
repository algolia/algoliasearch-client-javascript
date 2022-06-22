import type { SynonymHit } from './synonymHit';

export type SearchSynonymsResponse = Record<string, any> & {
  /**
   * Array of synonym objects.
   */
  hits: SynonymHit[];
  /**
   * Number of hits that the search query matched.
   */
  nbHits: number;
};
