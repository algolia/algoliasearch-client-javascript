import type { Rule } from './rule';

export type SearchRulesResponse = {
  /**
   * Fetched rules.
   */
  hits: Rule[];
  /**
   * Number of fetched rules.
   */
  nbHits: number;
  /**
   * Current page.
   */
  page: number;
  /**
   * Number of pages.
   */
  nbPages: number;
};
