/**
 * The `searchDictionaryEntries` request.
 */
export type SearchDictionaryEntries = {
  /**
   * The text to search in the index.
   */
  query: string;
  /**
   * Specify the page to retrieve.
   */
  page?: number;
  /**
   * Set the number of hits per page.
   */
  hitsPerPage?: number;
  /**
   * Language ISO code supported by the dictionary (e.g., \"en\" for English).
   */
  language?: string;
};
