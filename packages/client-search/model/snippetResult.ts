export type SnippetResult = {
  /**
   * Markup text with occurrences highlighted.
   */
  value?: string;
  /**
   * Indicates how well the attribute matched the search query.
   */
  matchLevel?: SnippetResultMatchLevel;
};

export type SnippetResultMatchLevel = 'full' | 'none' | 'partial';
