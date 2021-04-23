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
        /**
         * The search options.
         */
        readonly params?: SharedMultipleQueriesQuery['params'] & {
          /**
           * The search query used to search the facet attribute. Follows the same rules for an index query: a single character, a partial word, a word, or a phrase.
           */
          readonly facetQuery?: string;
        };
      }
  );
