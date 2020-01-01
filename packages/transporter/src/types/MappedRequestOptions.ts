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
  readonly headers: { [key: string]: string }; // eslint-disable-line functional/prefer-readonly-type

  /**
   * The query parameters of the request.
   */
  readonly queryParameters: { [key: string]: any }; // eslint-disable-line functional/prefer-readonly-type

  /**
   * The data to be transfered to the server.
   */
  readonly data?: { [key: string]: string }; // eslint-disable-line functional/prefer-readonly-type
};
