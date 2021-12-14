export type HighlightedSynonym = {
  /**
   * Markup text with occurrences highlighted.
   */
  value?: string;
  /**
   * Indicates how well the attribute matched the search query.
   */
  matchLevel?: HighlightedSynonym.MatchLevelEnum;
  /**
   * List of words from the query that matched the object.
   */
  matchedWords?: string[];
  /**
   * Whether the entire attribute value is highlighted.
   */
  fullyHighlighted?: boolean;
};

export namespace HighlightedSynonym {
  export enum MatchLevelEnum {
    None = 'none',
    Partial = 'partial',
    Full = 'full',
  }
}
