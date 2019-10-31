import { encode } from '@algolia/client-common/helpers';

import { createHost } from './createHost';
import { Request } from './types/Request';
import { RequestOptions } from './types/RequestOptions';

export function serializeUrl(
  host: ReturnType<typeof createHost>,
  path: string,
  queryParameters: { readonly [key: string]: string }
): string {
  const queryParametersAsString = serializeQueryParameters(queryParameters);

  // eslint-disable-next-line functional/no-let
  let url = `https://${host.url}/${path}`;

  if (queryParametersAsString.length) {
    url += `?${queryParametersAsString}`;
  }

  return url;
}

export function serializeQueryParameters(parameters: { readonly [key: string]: string }): string {
  const parametersKeys = Object.keys(parameters);

  return `${parametersKeys.map(key => encode('%s=%s', key, parameters[key])).join('&')}`;
}

export function serializeData(request: Request, requestOptions: RequestOptions): string {
  const data = Array.isArray(request.data)
    ? request.data
    : { ...request.data, ...requestOptions.data };

  if (data.constructor === Object && Object.entries(data).length === 0) {
    return '';
  }

  return JSON.stringify(data);
}
