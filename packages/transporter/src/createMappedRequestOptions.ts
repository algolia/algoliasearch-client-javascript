import { MappedRequestOptions, RequestOptions } from '.';

export function createMappedRequestOptions(
  requestOptions?: RequestOptions,
  timeout?: number
): MappedRequestOptions {
  const options: RequestOptions = requestOptions || {};

  const data: Record<string, string> = options.data || {};

  Object.keys(options).forEach(key => {
    if (['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(key) === -1) {
      data[key] = options[key]; // eslint-disable-line functional/immutable-data
    }
  });

  return {
    data: Object.entries(data).length > 0 ? data : undefined,
    timeout: options.timeout || timeout,
    headers: options.headers || {},
    queryParameters: options.queryParameters || {},
    cacheable: options.cacheable,
  };
}
