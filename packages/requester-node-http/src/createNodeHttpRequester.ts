import { Request, Requester, Response } from '@algolia/requester-common';
import * as http from 'http';
import * as https from 'https';
import * as URL from 'url';

export function createNodeHttpRequester(): Requester {
  return {
    send(request: Request): Readonly<Promise<Response>> {
      return new Promise(resolve => {
        const url = URL.parse(request.url);

        const path = url.query === null ? url.pathname : `${url.pathname}?${url.query}`;

        const options: https.RequestOptions = {
          hostname: url.hostname || '',
          path: path || '',
          method: request.method,
          headers: request.headers,
          ...(url.port !== undefined ? { port: url.port || '' } : {}),
        };

        const req = (url.protocol === 'https:' ? https : http).request(options, response => {
          // eslint-disable-next-line functional/no-let
          let content = '';

          response.on('data', chunk => (content += chunk));

          response.on('end', () => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            clearTimeout(connectTimeout);
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            clearTimeout(socketTimeout as NodeJS.Timeout);

            const status = response.statusCode === undefined ? 0 : response.statusCode;
            resolve({ status, content, isTimedOut: false });
          });
        });

        const createTimeout = (timeout: number, content: string): NodeJS.Timeout => {
          return setTimeout(() => {
            req.abort();

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

        req.on('error', error => {
          clearTimeout(connectTimeout);
          clearTimeout(socketTimeout as NodeJS.Timeout);
          resolve({ status: 0, content: error.message, isTimedOut: false });
        });

        req.once('response', () => {
          clearTimeout(connectTimeout);
          socketTimeout = createTimeout(request.socketTimeout, 'Socket timeout');
        });

        req.write(request.data);

        req.end();
      });
    },
  };
}
