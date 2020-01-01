import { Synonym } from '.';

export type SearchSynonymsResponse = {
  /**
   * The list of synonyms.
   */
  readonly hits: readonly Synonym[];

  /**
   * The number of synonyms on the list.
   */
  readonly nbHits: number;
};
