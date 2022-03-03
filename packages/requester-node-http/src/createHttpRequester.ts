import http from 'http';
import https from 'https';
import { URL } from 'url';

import type { EndRequest, Requester, Response } from '@algolia/client-common';

// Global agents allow us to reuse the TCP protocol with multiple clients
const agentOptions = { keepAlive: true };
const httpAgent = new http.Agent(agentOptions);
const httpsAgent = new https.Agent(agentOptions);

export function createHttpRequester(): Requester {
  function send(request: EndRequest): Promise<Response> {
    return new Promise((resolve) => {
      let responseTimeout: NodeJS.Timeout | undefined;
      // eslint-disable-next-line prefer-const -- linter thinks this is not reassigned
      let connectTimeout: NodeJS.Timeout | undefined;
      const url = new URL(request.url);
      const path =
        url.search === null ? url.pathname : `${url.pathname}${url.search}`;
      const options: https.RequestOptions = {
        agent: url.protocol === 'https:' ? httpsAgent : httpAgent,
        hostname: url.hostname,
        path,
        method: request.method,
        headers: request.headers,
        ...(url.port !== undefined ? { port: url.port || '' } : {}),
      };

      const req = (url.protocol === 'https:' ? https : http).request(
        options,
        (response) => {
          let contentBuffers: Buffer[] = [];

          response.on('data', (chunk) => {
            contentBuffers = contentBuffers.concat(chunk);
          });

          response.on('end', () => {
            clearTimeout(connectTimeout as NodeJS.Timeout);
            clearTimeout(responseTimeout as NodeJS.Timeout);

            resolve({
              status: response.statusCode || 0,
              content: Buffer.concat(contentBuffers).toString(),
              isTimedOut: false,
            });
          });
        }
      );

      const createTimeout = (
        timeout: number,
        content: string
      ): NodeJS.Timeout => {
        return setTimeout(() => {
          req.destroy();

          resolve({
            status: 0,
            content,
            isTimedOut: true,
          });
        }, timeout * 1000);
      };

      connectTimeout = createTimeout(
        request.connectTimeout,
        'Connection timeout'
      );

      req.on('error', (error) => {
        clearTimeout(connectTimeout as NodeJS.Timeout);
        clearTimeout(responseTimeout!);
        resolve({ status: 0, content: error.message, isTimedOut: false });
      });

      req.once('response', () => {
        clearTimeout(connectTimeout as NodeJS.Timeout);
        responseTimeout = createTimeout(
          request.responseTimeout,
          'Socket timeout'
        );
      });

      if (request.data !== undefined) {
        req.write(request.data);
      }

      req.end();
    });
  }

  return { send };
}
