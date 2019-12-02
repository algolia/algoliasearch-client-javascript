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

        const connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');

        // eslint-disable-next-line functional/no-let
        let socketTimeout: NodeJS.Timeout | undefined;

        // eslint-disable-next-line functional/immutable-data
        baseRequester.onreadystatechange = () => {
          if (baseRequester.readyState > baseRequester.OPENED && socketTimeout === undefined) {
            clearTimeout(connectTimeout);

            socketTimeout = createTimeout(request.socketTimeout, 'Socket timeout');
          }
        };

        // eslint-disable-next-line functional/immutable-data
        baseRequester.onerror = () => {
          // istanbul ignore next
          if (baseRequester.status === 0) {
            clearTimeout(connectTimeout);
            clearTimeout(socketTimeout as NodeJS.Timeout);

            resolve({
              content: baseRequester.responseText || 'Network request failed',
              status: baseRequester.status,
              isTimedOut: false,
            });
          }
        };

        //  eslint-disable-next-line functional/immutable-data
        baseRequester.onload = () => {
          clearTimeout(connectTimeout);
          clearTimeout(socketTimeout as NodeJS.Timeout);

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
