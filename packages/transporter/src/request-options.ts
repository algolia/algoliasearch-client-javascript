import { MappedRequestOptions, RequestOptions } from '.';

export function mapRequestOptions(
  requestOptions?: RequestOptions,
  timeout?: number
): MappedRequestOptions {
  const options: RequestOptions = requestOptions || {};

  // eslint-disable-next-line functional/prefer-readonly-type
  const data: { [key: string]: string } = {};

  Object.keys(options).forEach(key => {
    if (['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(key) === -1) {
      data[key] = options[key]; // eslint-disable-line functional/immutable-data
    }
  });

  return {
    data,
    timeout: options.timeout || timeout,
    headers: options.headers || {},
    queryParameters: options.queryParameters || {},
    cacheable: options.cacheable,
  };
}

export function popRequestOption<TRequestOption = undefined>(
  requestOptions: RequestOptions | undefined,
  key: string,
  defaultValue?: TRequestOption
): TRequestOption {
  if (requestOptions !== undefined && key in requestOptions) {
    const value: TRequestOption = requestOptions[key];

    // eslint-disable-next-line no-param-reassign, functional/immutable-data
    delete requestOptions[key];

    return value;
  }

  return defaultValue as TRequestOption;
}
