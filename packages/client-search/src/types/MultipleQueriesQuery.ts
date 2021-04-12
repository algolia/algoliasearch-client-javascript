import { SearchOptions } from '.';

type SharedMultipleQueriesQuery = {
  /**
   * The type of query to perform.
   *
   * @defaultValue "default"
   */
  readonly type?: 'default' | 'facet';

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

export type MultipleQueriesQuery = SharedMultipleQueriesQuery &
  (
    | {
        readonly type?: 'default';
      }
    | {
        readonly type: 'facet';
        /**
         * The facet name.
         */
        readonly facet: string;
      }
  );
