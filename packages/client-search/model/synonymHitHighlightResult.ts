// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { HighlightResult } from './highlightResult';

/**
 * Highlighted results.
 */
export type SynonymHitHighlightResult = {
  /**
   * Show highlighted section and words matched on a query.
   */
  type?: Record<string, HighlightResult>;

  synonyms?: Array<Record<string, HighlightResult>>;
};
