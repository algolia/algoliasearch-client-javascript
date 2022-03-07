/**
 * Highlighted attributes.
 */
export type HighlightResult = {
  /**
   * Markup text with occurrences highlighted.
   */
  value?: string;
  /**
   * Indicates how well the attribute matched the search query.
   */
  matchLevel?: HighlightResultMatchLevel;
  /**
   * List of words from the query that matched the object.
   */
  matchedWords?: string[];
  /**
   * Whether the entire attribute value is highlighted.
   */
  fullyHighlighted?: boolean;
};

export type HighlightResultMatchLevel = 'full' | 'none' | 'partial';
