import type { MultipleQueriesType } from './multipleQueriesType';

export type MultipleQueries = {
  /**
   * The Algolia index name.
   */
  indexName: string;
  /**
   * The text to search in the index.
   */
  query?: string;
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
