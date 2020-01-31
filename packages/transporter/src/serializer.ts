import { encode } from '@algolia/client-common';
import { MethodEnum } from '@algolia/requester-common';

import { Headers, Request, RequestOptions, StatelessHost, Transporter } from '.';

export function serializeUrl(
  host: StatelessHost,
  path: string,
  queryParameters: Readonly<Record<string, string>>
): string {
  const queryParametersAsString = serializeQueryParameters(queryParameters);
  // eslint-disable-next-line functional/no-let
  let url = `${host.protocol}://${host.url}/${path.charAt(0) === '/' ? path.substr(1) : path}`;

  if (queryParametersAsString.length) {
    url += `?${queryParametersAsString}`;
  }

  return url;
}

export function serializeQueryParameters(parameters: Readonly<Record<string, any>>): string {
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

export function serializeData(
  request: Request,
  requestOptions: RequestOptions
): string | undefined {
  if (
    request.method === MethodEnum.Get ||
    (request.data === undefined && requestOptions.data === undefined)
  ) {
    return undefined;
  }

  const data = Array.isArray(request.data)
    ? request.data
    : { ...request.data, ...requestOptions.data };

  return JSON.stringify(data);
}

export function serializeHeaders(
  transporter: Transporter,
  requestOptions: RequestOptions
): Headers {
  const headers: Headers = {
    ...transporter.headers,
    ...requestOptions.headers,
  };
  const serializedHeaders: Headers = {};

  Object.keys(headers).forEach(header => {
    const value = headers[header];

    // @ts-ignore
    // eslint-disable-next-line functional/immutable-data
    serializedHeaders[header.toLowerCase()] = value;
  });

  return serializedHeaders;
}
