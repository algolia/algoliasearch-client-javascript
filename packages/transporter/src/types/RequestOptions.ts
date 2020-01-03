export type RequestOptions = {
  /**
   * If the given request should persist on the cache. Keep in mind,
   * that some methods may have this option enabled by default.
   */
  readonly cacheable?: boolean;

  /**
   * Custom timeout for the request. Note that, in normal situacions
   * the given timeout will be applied. But the transporter layer may
   * increase this timeout if there is need for it.
   */
  readonly timeout?: number;

  /**
   * Custom headers for the request. This headers are
   * going to be merged the transporter headers.
   */
  readonly headers?: Readonly<Record<string, string>>;

  /**
   * Custom query parameters for the request. This query parameters are
   * going to be merged the transporter query parameters.
   */
  readonly queryParameters?: Record<string, any>;

  /**
   * Custom data for the request. This data are
   * going to be merged the transporter data.
   */
  readonly data?: Record<string, any>;

  /**
   * Additional request body values. It's only taken in
   * consideration in `POST` and `PUT` requests.
   */
  [key: string]: any; // eslint-disable-line functional/prefer-readonly-type
};
