import { Request, Requester, Response } from '@algolia/requester-types';
import * as https from 'https';
import * as URL from 'url';

export class NodeHttpRequester implements Requester {
  public send(request: Request): Promise<Response> {
    return new Promise(resolve => {
      const url = URL.parse(request.url);

      const options: https.RequestOptions = {
        hostname: url.hostname,
        path: url.pathname,
        protocol: url.protocol,
        method: request.method,
        headers: request.headers,
      };

      const req = https.request(options, response => {
        // eslint-disable-next-line functional/no-let
        let content = '';

        response.on('data', chunk => (content += chunk));

        response.on('end', () => {
          const status = response.statusCode === undefined ? 0 : response.statusCode;
          resolve({ status, content, isTimedOut: false });
        });
      });

      req.setTimeout(request.timeout * 1000, () => {
        req.abort();

        resolve({ status: 0, content: '', isTimedOut: true });
      });

      req.on('error', error => resolve({ status: 0, content: error.message, isTimedOut: false }));

      req.write(request.data);

      req.end();
    });
  }
}
