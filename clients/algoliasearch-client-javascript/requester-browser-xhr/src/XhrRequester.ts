import { Requester } from '@algolia/client-common';
import type { EndRequest, Response } from '@algolia/client-common';

export class XhrRequester extends Requester {
  send(request: EndRequest): Promise<Response> {
    return new Promise((resolve) => {
      const baseRequester = new XMLHttpRequest();
      baseRequester.open(request.method, request.url, true);

      Object.keys(request.headers).forEach((key) =>
        baseRequester.setRequestHeader(key, request.headers[key])
      );

      const createTimeout = (
        timeout: number,
        content: string
      ): NodeJS.Timeout => {
        return setTimeout(() => {
          baseRequester.abort();

          resolve({
            status: 0,
            content,
            isTimedOut: true,
          });
        }, timeout * 1000);
      };

      const connectTimeout = createTimeout(
        request.connectTimeout,
        'Connection timeout'
      );

      let responseTimeout: NodeJS.Timeout | undefined;

      baseRequester.onreadystatechange = (): void => {
        if (
          baseRequester.readyState > baseRequester.OPENED &&
          responseTimeout === undefined
        ) {
          clearTimeout(connectTimeout);

          responseTimeout = createTimeout(
            request.responseTimeout,
            'Socket timeout'
          );
        }
      };

      baseRequester.onerror = (): void => {
        // istanbul ignore next
        if (baseRequester.status === 0) {
          clearTimeout(connectTimeout);
          clearTimeout(responseTimeout as NodeJS.Timeout);

          resolve({
            content: baseRequester.responseText || 'Network request failed',
            status: baseRequester.status,
            isTimedOut: false,
          });
        }
      };

      baseRequester.onload = (): void => {
        clearTimeout(connectTimeout);
        clearTimeout(responseTimeout as NodeJS.Timeout);

        resolve({
          content: baseRequester.responseText,
          status: baseRequester.status,
          isTimedOut: false,
        });
      };

      baseRequester.send(request.data);
    });
  }
}
