/**
 * Map of language ISO code supported by the dictionary (e.g., \"en\" for English) to a boolean value.
 */
export type StandardEntries = {
  /**
   * Language ISO code.
   */
  plurals?: { [key: string]: boolean } | null;
  /**
   * Language ISO code.
   */
  stopwords?: { [key: string]: boolean } | null;
  /**
   * Language ISO code.
   */
  compounds?: { [key: string]: boolean } | null;
};
