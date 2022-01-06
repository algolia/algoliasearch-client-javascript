export type MultipleQueries = {
  /**
   * The Algolia index name.
   */
  indexName: string;
  /**
   * The text to search in the index.
   */
  query?: string;
  /**
   * Perform a search query with `default`, will search for facet values if `facet` is given.
   */
  type?: MultipleQueriesType;
  /**
   * The `facet` name.
   */
  facet?: string;
  /**
   * A query string of search parameters.
   */
  params?: string;
};

export type MultipleQueriesType = 'default' | 'facet';
