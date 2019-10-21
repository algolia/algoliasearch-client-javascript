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
  readonly queryParameters?: { readonly [key: string]: string };

  // eslint-disable-next-line functional/no-mixed-type, functional/prefer-readonly-type
  [key: string]: any;
};

export function mapRequestOptions(
  requestOptions: RequestOptions | undefined,
  timeout?: number | undefined
): MappedRequestOptions {
  const options: RequestOptions = requestOptions === undefined ? {} : requestOptions;

  // eslint-disable-next-line functional/prefer-readonly-type
  const data: { [key: string]: string } = {};

  Object.keys(options).forEach(key => {
    if (!['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].includes(key)) {
      data[key] = options[key]; // eslint-disable-line functional/immutable-data
    }
  });

  return {
    data,
    timeout: options.timeout === undefined ? timeout : options.timeout,
    headers: options.headers === undefined ? {} : options.headers,
    queryParameters: options.queryParameters === undefined ? {} : options.queryParameters,
    cacheable: options.cacheable,
  };
}

export function popRequestOption<TRequestOption>(
  requestOptions: RequestOptions | undefined,
  key: string,
  defaultValue: TRequestOption
): TRequestOption {
  if (requestOptions !== undefined && key in requestOptions) {
    const value: TRequestOption = requestOptions[key];

    // eslint-disable-next-line no-param-reassign, functional/immutable-data
    delete requestOptions[key];

    return value;
  }

  return defaultValue;
}

export type MappedRequestOptions = {
  readonly cacheable: boolean | undefined;
  readonly timeout: number | undefined;
  readonly data: { readonly [key: string]: string };
  readonly headers: { readonly [key: string]: string };
  readonly queryParameters: { readonly [key: string]: string };
};
