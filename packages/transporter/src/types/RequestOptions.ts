export type RequestOptions = {
  /**
   * If the given request should be stored within the cache. By default, only
   * [search] and [searchForFacetValues] requests are stored.
   */
  readonly cacheable?: boolean;

  /**
   * A specific timeout for the request.
   */
  readonly timeout?: number;

  /**
   * A specific headers for the request.
   */
  readonly headers?: { readonly [key: string]: string };

  /**
   * Specific query parameters for the request.
   */
  readonly queryParameters?: {
    // eslint-disable-next-line functional/prefer-readonly-type
    [key: string]: any;
  };

  // eslint-disable-next-line functional/prefer-readonly-type
  [key: string]: any;
};
