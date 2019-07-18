export function mapRequestOptions(requestOptions?: RequestOptions): MappedRequestOptions {
  const options: RequestOptions = requestOptions === undefined ? {} : requestOptions;

  const data: { [key: string]: string } = {};

  Object.keys(options).forEach(key => {
    if (!['timeout', 'headers', 'queryParameters', 'data'].includes(key)) {
      data[key] = options[key];
    }
  });

  return {
    data,
    timeout: options.timeout,
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
    const value: TRequestOption = requestOptions[key]; // --> OFF

    /* eslint no-param-reassign: 0 */
    delete requestOptions[key];

    return value;
  }

  return defaultValue;
}

export type RequestOptions = {
  timeout?: number;
  headers?: { [key: string]: string };
  queryParameters?: { [key: string]: string };
  [key: string]: any;
};

export type MappedRequestOptions = {
  timeout?: number;
  data: { [key: string]: string };
  headers: { [key: string]: string };
  queryParameters: { [key: string]: string };
};
