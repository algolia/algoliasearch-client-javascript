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
