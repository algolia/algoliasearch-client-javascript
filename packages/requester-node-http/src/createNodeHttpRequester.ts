/* eslint functional/prefer-readonly-type: 0 */
/* eslint sonarjs/cognitive-complexity: 0 */ // -->

import { Destroyable, Request, Requester, Response } from '@algolia/requester-common';
import * as http from 'http';
import * as https from 'https';
import * as URL from 'url';
import * as zlib from 'zlib';

export type NodeHttpRequesterOptions = {
  agent?: https.Agent | http.Agent;
  httpAgent?: http.Agent;
  httpsAgent?: https.Agent;
  requesterOptions?: https.RequestOptions;
};

const agentOptions = { keepAlive: true };
const defaultHttpAgent = new http.Agent(agentOptions);
const defaultHttpsAgent = new https.Agent(agentOptions);

export function createNodeHttpRequester({
  agent: userGlobalAgent,
  httpAgent: userHttpAgent,
  httpsAgent: userHttpsAgent,
  requesterOptions = {},
}: NodeHttpRequesterOptions = {}): Requester & Destroyable {
  const httpAgent = userHttpAgent || userGlobalAgent || defaultHttpAgent;
  const httpsAgent = userHttpsAgent || userGlobalAgent || defaultHttpsAgent;

  return {
    send(request: Request): Readonly<Promise<Response>> {
      return new Promise(resolve => {
        const url = URL.parse(request.url);

        const path = url.query === null ? url.pathname : `${url.pathname}?${url.query}`;

        const COMPRESSION_THRESHOLD = 750;
        const acceptEncoding = request.headers['accept-encoding'];
        const shouldCompress =
          request.data !== undefined &&
          Buffer.byteLength(request.data) >= COMPRESSION_THRESHOLD &&
          acceptEncoding !== undefined &&
          acceptEncoding.toLowerCase().includes('gzip');

        const options: https.RequestOptions = {
          ...requesterOptions,
          agent: url.protocol === 'https:' ? httpsAgent : httpAgent,
          hostname: url.hostname,
          path,
          method: request.method,
          headers: {
            ...(requesterOptions && requesterOptions.headers ? requesterOptions.headers : {}),
            ...request.headers,
            ...(shouldCompress ? { 'content-encoding': 'gzip' } : {}),
          },
          ...(url.port !== undefined ? { port: url.port || '' } : {}),
        };

        // eslint-disable-next-line functional/no-let, prefer-const
        let connectTimeout: NodeJS.Timeout;
        // eslint-disable-next-line functional/no-let
        let responseTimeout: NodeJS.Timeout | undefined;
        // eslint-disable-next-line functional/no-let
        let gunzip: zlib.Gunzip | undefined;

        const cleanup = (): void => {
          clearTimeout(connectTimeout);
          clearTimeout(responseTimeout as NodeJS.Timeout);

          if (gunzip) {
            gunzip.destroy();
          }
        };

        const onError = (error: Error): void => {
          cleanup();
          resolve({ status: 0, content: error.message, isTimedOut: false });
        };

        const req = (url.protocol === 'https:' ? https : http).request(options, response => {
          const contentEncoding = response.headers['content-encoding'];
          const isGzipResponse =
            contentEncoding !== undefined && contentEncoding.toLowerCase().includes('gzip');

          // eslint-disable-next-line functional/no-let
          let contentBuffers: Buffer[] = [];

          const onData = (chunk: Buffer): void => {
            contentBuffers = contentBuffers.concat(chunk);
          };

          const onEnd = (): void => {
            cleanup();

            resolve({
              status: response.statusCode || 0,
              content: Buffer.concat(contentBuffers).toString(),
              isTimedOut: false,
            });
          };

          response.on('error', onError);

          if (isGzipResponse) {
            gunzip = zlib.createGunzip();

            response.pipe(gunzip);

            gunzip.on('data', onData);
            gunzip.on('end', onEnd);
            gunzip.on('error', onError);
          } else {
            response.on('data', onData);
            response.on('end', onEnd);
          }
        });

        const createTimeout = (timeout: number, content: string): NodeJS.Timeout => {
          return setTimeout(() => {
            req.abort();

            if (gunzip) {
              gunzip.destroy();
            }

            resolve({
              status: 0,
              content,
              isTimedOut: true,
            });
          }, timeout * 1000);
        };

        connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');

        req.on('error', onError);

        req.once('response', () => {
          clearTimeout(connectTimeout);
          responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
        });

        if (request.data !== undefined && shouldCompress) {
          zlib.gzip(request.data, (error, compressedBody) => {
            if (error) {
              onError(error);

              return;
            }

            req.setHeader('content-length', compressedBody.byteLength);
            req.write(compressedBody);
            req.end();
          });
        } else {
          if (request.data !== undefined) {
            req.setHeader('content-length', Buffer.byteLength(request.data));
            req.write(request.data);
          }

          req.end();
        }
      });
    },

    destroy() {
      httpAgent.destroy();
      httpsAgent.destroy();

      return Promise.resolve();
    },
  };
}
