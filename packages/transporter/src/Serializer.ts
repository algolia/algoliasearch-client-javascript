import { encode } from '@algolia/support';

import { Host, Request, RequestOptions } from '../';

export class Serializer {
  public static url(
    host: Host,
    path: string,
    queryParameters: { readonly [key: string]: string }
  ): string {
    const queryParametersAsString = this.queryParameters(queryParameters);

    // eslint-disable-next-line functional/no-let
    let url = `https://${host.url}/${path}`;

    if (queryParametersAsString.length) {
      url += `?${queryParametersAsString}`;
    }

    return url;
  }

  public static queryParameters(parameters: { readonly [key: string]: string }): string {
    const parametersKeys = Object.keys(parameters);

    return `${parametersKeys.map(key => encode('%s=%s', key, parameters[key])).join('&')}`;
  }

  public static data(request: Request, requestOptions: RequestOptions): string {
    const data = Array.isArray(request.data)
      ? request.data
      : { ...request.data, ...requestOptions.data };

    if (data.constructor === Object && Object.entries(data).length === 0) {
      return '';
    }

    return JSON.stringify(data);
  }
}
