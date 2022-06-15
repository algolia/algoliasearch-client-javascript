/**
 * Map of language ISO code supported by the dictionary (e.g., \"en\" for English) to a boolean value.
 */
export type StandardEntries = {
  /**
   * Language ISO code.
   */
  plurals?: Record<string, boolean> | null;
  /**
   * Language ISO code.
   */
  stopwords?: Record<string, boolean> | null;
  /**
   * Language ISO code.
   */
  compounds?: Record<string, boolean> | null;
};
