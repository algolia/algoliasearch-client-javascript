import type { EndRequest, Requester, Response } from '@algolia/client-common';

type Timeout = ReturnType<typeof setTimeout>;

function parseResponseHeaders(rawHeaders: string): Record<string, string> {
  const headers: Record<string, string> = {};

  for (const line of rawHeaders.trim().split(/[\r\n]+/)) {
    const separatorIndex = line.indexOf(': ');
    if (separatorIndex > 0) {
      headers[line.slice(0, separatorIndex).toLowerCase()] = line.slice(separatorIndex + 2);
    }
  }

  return headers;
}

export function createXhrRequester(): Requester {
  function send(request: EndRequest): Promise<Response> {
    return new Promise((resolve) => {
      const baseRequester = new XMLHttpRequest();
      baseRequester.open(request.method, request.url, true);

      Object.keys(request.headers).forEach((key) => baseRequester.setRequestHeader(key, request.headers[key]));

      const createTimeout = (timeout: number, content: string): Timeout => {
        return setTimeout(() => {
          baseRequester.abort();

          resolve({
            status: 0,
            content,
            isTimedOut: true,
          });
        }, timeout);
      };

      const connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');

      let responseTimeout: Timeout | undefined;

      baseRequester.onreadystatechange = (): void => {
        if (baseRequester.readyState > baseRequester.OPENED && responseTimeout === undefined) {
          clearTimeout(connectTimeout);

          responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
        }
      };

      baseRequester.onerror = (): void => {
        // istanbul ignore next
        if (baseRequester.status === 0) {
          clearTimeout(connectTimeout);
          clearTimeout(responseTimeout!);

          resolve({
            content: baseRequester.responseText || 'Network request failed',
            status: baseRequester.status,
            isTimedOut: false,
          });
        }
      };

      baseRequester.onload = (): void => {
        clearTimeout(connectTimeout);
        clearTimeout(responseTimeout!);

        resolve({
          content: baseRequester.responseText,
          headers: parseResponseHeaders(baseRequester.getAllResponseHeaders()),
          status: baseRequester.status,
          isTimedOut: false,
        });
      };

      baseRequester.send(request.data as XMLHttpRequestBodyInit | null | undefined);
    });
  }

  return { send };
}
