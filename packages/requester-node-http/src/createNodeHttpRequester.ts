import { Request, Requester, Response } from '@algolia/requester-common';
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
          protocol: url.protocol || '',
          method: request.method,
          headers: request.headers,
          ...(url.port !== undefined ? { port: url.port || '' } : {}),
        };

        // eslint-disable-next-line functional/no-let, prefer-const
        let timeoutHandler: NodeJS.Timeout;

        const req = https.request(options, response => {
          // eslint-disable-next-line functional/no-let
          let content = '';

          response.on('data', chunk => (content += chunk));

          response.on('end', () => {
            clearTimeout(timeoutHandler);

            const status = response.statusCode === undefined ? 0 : response.statusCode;
            resolve({ status, content, isTimedOut: false });
          });
        });

        timeoutHandler = setTimeout(() => {
          req.abort();
          resolve({ status: 0, content: '', isTimedOut: true });
        }, request.timeout * 1000);

        req.on('error', error => {
          clearTimeout(timeoutHandler);
          resolve({ status: 0, content: error.message, isTimedOut: false });
        });

        req.write(request.data);

        req.end();
      });
    },
  };
}
