export function mapRequestOptions(
  requestOptions: RequestOptions | undefined,
  timeout?: number | undefined
): MappedRequestOptions {
  const options: RequestOptions = requestOptions === undefined ? {} : requestOptions;

  // eslint-disable-next-line functional/prefer-readonly-types
  const data: { [key: string]: string } = {};

  Object.keys(options).forEach(key => {
    if (!['timeout', 'headers', 'queryParameters', 'data'].includes(key)) {
      data[key] = options[key]; // eslint-disable-line functional/immutable-data
    }
  });

  return {
    data,
    timeout: options.timeout === undefined ? timeout : options.timeout,
    headers: options.headers === undefined ? {} : options.headers,
    queryParameters: options.queryParameters === undefined ? {} : options.queryParameters,
  };
}

export function popRequestOption<TRequestOption>(
  requestOptions: RequestOptions | undefined,
  key: string,
  defaultValue: TRequestOption
): TRequestOption {
  if (requestOptions !== undefined && key in requestOptions) {
    const value: TRequestOption = requestOptions[key];

    delete requestOptions[key]; // eslint-disable-line no-param-reassign, functional/immutable-data

    return value;
  }

  return defaultValue;
}

export type RequestOptions = {
  readonly timeout?: number;
  readonly headers?: { readonly [key: string]: string };
  readonly queryParameters?: { readonly [key: string]: string };

  // eslint-disable-next-line functional/prefer-readonly-types
  [key: string]: any;
};

export type MappedRequestOptions = {
  readonly timeout?: number;
  readonly data: { readonly [key: string]: string };
  readonly headers: { readonly [key: string]: string };
  readonly queryParameters: { readonly [key: string]: string };
};
