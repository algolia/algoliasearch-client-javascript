import type {
  Headers,
  Host,
  Request,
  RequestOptions,
  QueryParameters,
  Response,
  StackFrame,
} from '../types';

import { ApiError, DeserializationError } from './errors';

export function shuffle<TData>(array: TData[]): TData[] {
  const shuffledArray = array;

  for (let c = array.length - 1; c > 0; c--) {
    const b = Math.floor(Math.random() * (c + 1));
    const a = array[c];

    shuffledArray[c] = array[b];
    shuffledArray[b] = a;
  }

  return shuffledArray;
}

export function serializeUrl(
  host: Host,
  path: string,
  queryParameters: Readonly<Record<string, string>>
): string {
  const queryParametersAsString = serializeQueryParameters(queryParameters);
  let url = `${host.protocol}://${host.url}/${
    path.charAt(0) === '/' ? path.substr(1) : path
  }`;

  if (queryParametersAsString.length) {
    url += `?${queryParametersAsString}`;
  }

  return url;
}

export function serializeQueryParameters(parameters: QueryParameters): string {
  const isObjectOrArray = (value: any): boolean =>
    Object.prototype.toString.call(value) === '[object Object]' ||
    Object.prototype.toString.call(value) === '[object Array]';

  return Object.keys(parameters)
    .map(
      (key) =>
        `${key}=${
          isObjectOrArray(parameters[key])
            ? JSON.stringify(parameters[key])
            : parameters[key]
        }`
    )
    .join('&');
}

export function serializeData(
  request: Request,
  requestOptions: RequestOptions
): string | undefined {
  if (
    request.method === 'GET' ||
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
  baseHeaders: Headers,
  requestOptions: RequestOptions
): Headers {
  const headers: Headers = {
    ...baseHeaders,
    ...requestOptions.headers,
  };
  const serializedHeaders: Headers = {};

  Object.keys(headers).forEach((header) => {
    const value = headers[header];
    serializedHeaders[header.toLowerCase()] = value;
  });

  return serializedHeaders;
}

export function deserializeSuccess<TObject>(response: Response): TObject {
  try {
    return JSON.parse(response.content);
  } catch (e) {
    throw new DeserializationError((e as Error).message, response);
  }
}

export function deserializeFailure(
  { content, status }: Response,
  stackFrame: StackFrame[]
): Error {
  let message = content;
  try {
    message = JSON.parse(content).message;
  } catch (e) {
    // ..
  }
  return new ApiError(message, status, stackFrame);
}
