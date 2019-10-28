import { Request, Requester, Response } from '@algolia/requester-types';

export function createBrowserXhrRequester(): Requester {
  return {
    send(request: Request): Readonly<Promise<Response>> {
      return new Promise((resolve): void => {
        const baseRequester = new XMLHttpRequest();
        baseRequester.open(request.method, request.url, true);

        Object.keys(request.headers).forEach(key =>
          baseRequester.setRequestHeader(key, request.headers[key])
        );

        const timeoutHandler = setTimeout(() => {
          baseRequester.abort();
          resolve({ status: 0, content: '', isTimedOut: true });
        }, request.timeout * 1000);

        // eslint-disable-next-line functional/immutable-data
        baseRequester.onerror = () => {
          // istanbul ignore next
          if (baseRequester.status === 0) {
            clearTimeout(timeoutHandler);

            resolve({
              content: baseRequester.responseText || 'Network request failed',
              status: baseRequester.status,
              isTimedOut: false,
            });
          }
        };

        //  eslint-disable-next-line functional/immutable-data
        baseRequester.onload = () => {
          clearTimeout(timeoutHandler);

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
