export type Log = {
  /**
   * Timestamp in ISO-8601 format.
   */
  readonly timestamp: string;

  /**
   * Rest type of the method.
   */
  readonly method: string;

  /**
   * Http response code.
   */
  readonly answer_code: string;

  /**
   * Request body. It’s truncated after 1000 characters.
   */
  readonly query_body: string;

  /**
   * Answer body. It’s truncated after 1000 characters.
   */
  readonly answer: string;

  /**
   * Request URL.
   */
  readonly url: string;

  /**
   * Client ip of the call.
   */
  readonly ip: string;

  /**
   * SHA1 ID of entry.
   */
  readonly sha1: string;

  /**
   * Request Headers (API Key is obfuscated).
   */
  readonly query_headers: string;

  /**
   * Number Of Api Calls
   */
  readonly nb_api_calls?: string;

  /**
   * Processing time for the query. This does not include network time.
   */
  readonly processing_time_ms: string;

  /**
   * Number of hits returned for the query.
   */
  readonly query_nb_hits?: string;

  /**
   * Exhaustive flags used during the query.
   */
  readonly exhaustive?: boolean;

  /**
   * Index name of the log
   */
  readonly index?: string;

  /**
   * Internal queries performed for this query.
   */
  readonly inner_queries: ReadonlyArray<{
    /**
     * Index name of the query.
     */
    readonly index_name: string;

    /**
     * Query ID of the query.
     */
    readonly query_id?: string;

    /**
     * The offset of the query.
     */
    readonly offset?: number;

    /**
     * The user token of the query.
     */
    readonly user_token?: string;
  }>;
};
