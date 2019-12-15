import { Request, Requester, Response } from '@algolia/requester-common';

export function createBrowserXhrRequester(): Requester {
  return {
    send(request: Request): Readonly<Promise<Response>> {
      return new Promise((resolve): void => {
        const baseRequester = new XMLHttpRequest();
        baseRequester.open(request.method, request.url, true);

        Object.keys(request.headers).forEach(key =>
          baseRequester.setRequestHeader(key, request.headers[key])
        );

        const createTimeout = (timeout: number, content: string): NodeJS.Timeout => {
          return setTimeout(() => {
            baseRequester.abort();

            resolve({
              status: 0,
              content,
              isTimedOut: true,
            });
          }, timeout * 1000);
        };

        // eslint-disable-next-line functional/no-let
        let timeout = createTimeout(request.connectTimeout, 'Connection timeout');

        // eslint-disable-next-line functional/immutable-data
        baseRequester.onreadystatechange = () => {
          if (baseRequester.readyState === baseRequester.DONE) {
            clearTimeout(timeout);
          } else if (baseRequester.readyState >= baseRequester.OPENED) {
            clearTimeout(timeout);

            timeout = createTimeout(request.socketTimeout, 'Socket timeout');
          }
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

        baseRequester.send(request.data);
      });
    },
  };
}
