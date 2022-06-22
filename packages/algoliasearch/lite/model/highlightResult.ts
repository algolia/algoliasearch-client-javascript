import type { MatchLevel } from './matchLevel';

/**
 * Highlighted attributes.
 */
export type HighlightResult = {
  /**
   * Markup text with occurrences highlighted.
   */
  value?: string;
  matchLevel?: MatchLevel;
  /**
   * List of words from the query that matched the object.
   */
  matchedWords?: string[];
  /**
   * Whether the entire attribute value is highlighted.
   */
  fullyHighlighted?: boolean;
};
