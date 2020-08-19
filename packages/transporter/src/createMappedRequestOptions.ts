import { MappedRequestOptions, RequestOptions } from '.';

const SPECIAL_KEYS = [
  'timeout',
  'headers',
  'queryParameters',
  'data',
  'cacheable',
  'requesterOptions',
];

export function createMappedRequestOptions(
  requestOptions?: RequestOptions,
  timeout?: number
): MappedRequestOptions {
  const options: RequestOptions = requestOptions || {};

  const data: Record<string, string> = options.data || {};

  Object.keys(options).forEach(key => {
    if (SPECIAL_KEYS.indexOf(key) === -1) {
      data[key] = options[key]; // eslint-disable-line functional/immutable-data
    }
  });

  return {
    data: Object.entries(data).length > 0 ? data : undefined,
    timeout: options.timeout || timeout,
    headers: options.headers || {},
    queryParameters: options.queryParameters || {},
    cacheable: options.cacheable,
    ...(options.requesterOptions ? { requesterOptions: options.requesterOptions } : {}),
  };
}
