import { Request, Requester, Response } from '@algolia/requester-types';

export class BrowserXhrRequester implements Requester {
  public send(request: Request): Promise<Response> {
    return new Promise((resolve): void => {
      const baseRequester = new XMLHttpRequest();

      baseRequester.timeout = 1000 * request.timeout;

      baseRequester.ontimeout = (): void => {
        resolve({
          content: baseRequester.statusText,
          status: baseRequester.status,
          isTimedOut: true,
        });
      };

      baseRequester.onload = (): void => {
        resolve({
          content: baseRequester.responseText,
          status: baseRequester.status,
          isTimedOut: false,
        });
      };

      baseRequester.open(request.method, request.url, true);

      for (const key in request.headers) {
        if (request.headers.hasOwnProperty(key)) {
          baseRequester.setRequestHeader(key, request.headers[key]);
        }
      }

      baseRequester.send(request.data);
    });
  }
}
