import { SearchOptions } from '.';

export type MultipleQueriesQuery = {
  /**
   * The index name.
   */
  readonly indexName: string;

  /**
   * The search options.
   */
  readonly params?: SearchOptions;

  /**
   * The query associated with the request.
   */
  readonly query?: string;
};
