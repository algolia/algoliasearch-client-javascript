export type SnippetResult = {
  /**
   * Markup text with occurrences highlighted.
   */
  value?: string;
  /**
   * Indicates how well the attribute matched the search query.
   */
  matchLevel?: SnippetResult.MatchLevelEnum;
};

export namespace SnippetResult {
  export enum MatchLevelEnum {
    None = 'none',
    Partial = 'partial',
    Full = 'full',
  }
}
