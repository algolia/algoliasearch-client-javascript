import { Host } from '@algolia/transporter-types';

export class Serializer {
  public static url(host: Host, path: string, queryParameters: { [key: string]: string }): string {
    let url = `https://${host.url}/${path}`;

    if (queryParameters.length) {
      url += `?${Object.keys(queryParameters)
        .map(key => `${key}=${queryParameters[key]}`)
        .join('&')}`;
    }

    return url;
  }

  public static data(data: object): string {
    return JSON.stringify(data);
  }
}
