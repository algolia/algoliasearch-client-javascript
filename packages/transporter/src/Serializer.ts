import { Host } from '@algolia/transporter-types';

export class Serializer {
  public static url(
    host: Host,
    path: string,
    queryParameters: { readonly [key: string]: string }
  ): string {
    // eslint-disable-next-line functional/no-let
    let url = `https://${host.url}/${path}`;

    const queryParametersKeys = Object.keys(queryParameters);
    if (queryParametersKeys.length) {
      url += `?${queryParametersKeys.map(key => `${key}=${queryParameters[key]}`).join('&')}`;
    }

    return url;
  }

  public static data(data: object): string {
    return JSON.stringify(data);
  }
}