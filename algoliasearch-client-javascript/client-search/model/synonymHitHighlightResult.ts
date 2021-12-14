import type { HighlightResult } from './highlightResult';

/**
 * Highlighted results.
 */
export type SynonymHitHighlightResult = {
  type?: HighlightResult;
  synonyms?: HighlightResult[];
};
