import { Request, Requester, Response } from '@algolia/requester-types';

export class BrowserXhrRequester implements Requester {
  public send(request: Request): Promise<Response> {
    return new Promise((resolve): void => {
      const baseRequester = new XMLHttpRequest();

      // eslint-disable-next-line functional/immutable-data
      baseRequester.timeout = 1000 * request.timeout;

      // eslint-disable-next-line functional/immutable-data
      baseRequester.ontimeout = () => {
        resolve({
          content: baseRequester.statusText,
          status: baseRequester.status,
          isTimedOut: true,
        });
      };

      // eslint-disable-next-line functional/immutable-data
      baseRequester.onerror = () => {
        // istanbul ignore next
        if (baseRequester.status === 0) {
          resolve({
            content: baseRequester.responseText || 'Network request failed',
            status: baseRequester.status,
            isTimedOut: false,
          });
        }
      };

      //  eslint-disable-next-line functional/immutable-data
      baseRequester.onload = () => {
        resolve({
          content: baseRequester.responseText,
          status: baseRequester.status,
          isTimedOut: false,
        });
      };

      baseRequester.open(request.method, request.url, true);

      Object.keys(request.headers).forEach(key =>
        baseRequester.setRequestHeader(key, request.headers[key])
      );

      baseRequester.send(request.data);
    });
  }
}
