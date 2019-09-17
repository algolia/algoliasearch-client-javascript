import { Request, Requester, Response } from '@algolia/requester-types';

export class BrowserXhrRequester implements Requester {
  public send(request: Request): Promise<Response> {
    return new Promise((resolve): void => {
      const baseRequester = new XMLHttpRequest();

      // eslint-disable-next-line functional/immutable-data
      baseRequester.timeout = 1000 * request.timeout;

      // eslint-disable-next-line functional/immutable-data
      baseRequester.ontimeout = (): void => {
        resolve({
          content: baseRequester.statusText,
          status: baseRequester.status,
          isTimedOut: true,
        });
      };

      // eslint-disable-next-line functional/immutable-data
      baseRequester.onerror = (): void => {
        if (baseRequester.status === 0) {
          resolve({
            content: baseRequester.responseText || 'Network request failed',
            status: baseRequester.status,
            isTimedOut: false,
          });
        }
      };

      //  eslint-disable-next-line functional/immutable-data
      baseRequester.onload = (): void => {
        resolve({
          content: baseRequester.responseText,
          status: baseRequester.status,
          isTimedOut: false,
        });
      };

      baseRequester.open(request.method, request.url, true);

      //  eslint-disable-next-line functional/no-loop-statement
      for (const key in request.headers) {
        if (request.headers.hasOwnProperty(key)) {
          //  eslint-disable-next-line functional/immutable-data
          baseRequester.setRequestHeader(key, request.headers[key]);
        }
      }

      baseRequester.send(request.data);
    });
  }
}
