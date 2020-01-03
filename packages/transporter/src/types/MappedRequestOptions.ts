export type MappedRequestOptions = {
  /**
   * If the request should be cached.
   */
  readonly cacheable: boolean | undefined;

  /**
   * The `read` or `write` timeout of the request.
   */
  readonly timeout: number | undefined;

  /**
   * The headers of the request.
   */
  readonly headers: Record<string, string>;

  /**
   * The query parameters of the request.
   */
  readonly queryParameters: Record<string, any>;

  /**
   * The data to be transfered to the server.
   */
  readonly data?: Record<string, string>;
};
