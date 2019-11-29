import { encode } from '@algolia/client-common';

import { Request, RequestOptions } from '.';
import { Host } from './types';

export function serializeUrl(
  host: Host,
  path: string,
  queryParameters: { readonly [key: string]: string }
): string {
  const queryParametersAsString = serializeQueryParameters(queryParameters);
  // eslint-disable-next-line functional/no-let
  let url = `https://${host.url}/${path.charAt(0) === '/' ? path.substr(1) : path}`;

  if (queryParametersAsString.length) {
    url += `?${queryParametersAsString}`;
  }

  return url;
}

export function serializeQueryParameters(parameters: { readonly [key: string]: any }): string {
  const isObjectOrArray = (value: any): boolean =>
    Object.prototype.toString.call(value) === '[object Object]' ||
    Object.prototype.toString.call(value) === '[object Array]';

  return Object.keys(parameters)
    .map(key =>
      encode(
        '%s=%s',
        key,
        isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]
      )
    )
    .join('&');
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
