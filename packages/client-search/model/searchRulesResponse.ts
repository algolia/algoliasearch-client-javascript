// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

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
