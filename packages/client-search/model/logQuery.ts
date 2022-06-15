export type LogQuery = {
  /**
   * Index targeted by the query.
   */
  index_name?: string;
  /**
   * User identifier.
   */
  user_token?: string;
  /**
   * QueryID for the given query.
   */
  query_id?: string;
};
