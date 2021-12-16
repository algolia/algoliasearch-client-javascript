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
  matchLevel?: HighlightResult.MatchLevelEnum;
  /**
   * List of words from the query that matched the object.
   */
  matchedWords?: string[];
  /**
   * Whether the entire attribute value is highlighted.
   */
  fullyHighlighted?: boolean;
};

export namespace HighlightResult {
  export enum MatchLevelEnum {
    None = 'none',
    Partial = 'partial',
    Full = 'full',
  }
}
