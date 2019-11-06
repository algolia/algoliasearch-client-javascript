import { MappedRequestOptions, RequestOptions } from '.';

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
