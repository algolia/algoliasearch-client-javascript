import { Synonym } from '.';

export type SearchSynonymsResponse = {
  /**
   * The list of synonyms.
   */
  hits: Synonym[];

  /**
   * The number of synonyms on the list.
   */
  nbHits: number;
};
