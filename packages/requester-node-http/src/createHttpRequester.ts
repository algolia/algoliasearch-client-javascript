import http from 'http';
import https from 'https';
import { Readable } from 'stream';
import { URL } from 'url';
import zlib from 'zlib';

import type { EndRequest, Requester, Response } from '@algolia/client-common';

export type CreateHttpRequesterOptions = Partial<{
  agent: http.Agent | https.Agent;
  httpAgent: http.Agent;
  httpsAgent: https.Agent;
  /**
   * RequestOptions to be merged with the end request, it will override default options if provided.
   */
  requesterOptions: https.RequestOptions;
}>;

// Global agents allow us to reuse the TCP protocol with multiple clients
const agentOptions = { keepAlive: true };
const defaultHttpAgent = new http.Agent(agentOptions);
const defaultHttpsAgent = new https.Agent(agentOptions);

export function createHttpRequester({
  agent: userGlobalAgent,
  httpAgent: userHttpAgent,
  httpsAgent: userHttpsAgent,
  requesterOptions = {},
}: CreateHttpRequesterOptions = {}): Requester {
  const httpAgent = userHttpAgent || userGlobalAgent || defaultHttpAgent;
  const httpsAgent = userHttpsAgent || userGlobalAgent || defaultHttpsAgent;

  function send(request: EndRequest): Promise<Response> {
    return new Promise((resolve) => {
      let responseTimeout: NodeJS.Timeout | undefined;
      let connectTimeout: NodeJS.Timeout | undefined;
      const url = new URL(request.url);
      const path = url.search === null ? url.pathname : `${url.pathname}${url.search}`;
      const privateHeaders: Record<string, string> = {
        'accept-encoding': 'gzip',
      };

      if (request.data !== undefined && request.method === 'DELETE') {
        privateHeaders['content-length'] = String(
          typeof request.data === 'string' ? Buffer.byteLength(request.data) : (request.data as Uint8Array).byteLength,
        );
      }

      const options: https.RequestOptions = {
        agent: url.protocol === 'https:' ? httpsAgent : httpAgent,
        hostname: url.hostname,
        path,
        method: request.method,
        ...requesterOptions,
        headers: {
          ...privateHeaders,
          ...request.headers,
          ...requesterOptions.headers,
        },
      };

      if (url.port && !requesterOptions.port) {
        options.port = url.port;
      }

      const req = (url.protocol === 'https:' ? https : http).request(options, (response) => {
        let contentBuffers: Buffer[] = [];

        response.on('data', (chunk) => {
          contentBuffers = contentBuffers.concat(chunk);
        });

        response.on('end', () => {
          clearTimeout(connectTimeout as NodeJS.Timeout);
          clearTimeout(responseTimeout as NodeJS.Timeout);

          let buffer = Buffer.concat(contentBuffers);
          if (response.headers['content-encoding'] === 'gzip') {
            buffer = zlib.gunzipSync(buffer);
          }

          resolve({
            status: response.statusCode || 0,
            content: buffer.toString(),
            isTimedOut: false,
          });
        });

        response.on('error', (error) => {
          clearTimeout(connectTimeout as NodeJS.Timeout);
          clearTimeout(responseTimeout as NodeJS.Timeout);
          resolve({ status: 0, content: error.message, isTimedOut: false });
        });
      });

      const createTimeout = (timeout: number, content: string): NodeJS.Timeout => {
        return setTimeout(() => {
          req.destroy();

          resolve({
            status: 0,
            content,
            isTimedOut: true,
          });
        }, timeout);
      };

      connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');

      req.on('error', (error) => {
        clearTimeout(connectTimeout as NodeJS.Timeout);
        clearTimeout(responseTimeout!);
        resolve({ status: 0, content: error.message, isTimedOut: false });
      });

      req.once('response', () => {
        clearTimeout(connectTimeout as NodeJS.Timeout);
        responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
      });

      if (request.data !== undefined) {
        req.write(request.data);
      }

      req.end();
    });
  }

  function sendStream(request: EndRequest): Promise<ReadableStream<Uint8Array>> {
    return new Promise((resolve, reject) => {
      const url = new URL(request.url);
      const path = url.search === null ? url.pathname : `${url.pathname}${url.search}`;
      const options: https.RequestOptions = {
        agent: url.protocol === 'https:' ? httpsAgent : httpAgent,
        hostname: url.hostname,
        path,
        method: request.method,
        ...requesterOptions,
        headers: {
          ...request.headers,
          ...requesterOptions.headers,
        },
      };

      if (url.port && !requesterOptions.port) {
        options.port = url.port;
      }

      const req = (url.protocol === 'https:' ? https : http).request(options, (response) => {
        const statusCode = response.statusCode || 0;

        if (statusCode < 200 || statusCode >= 300) {
          let body = '';
          response.on('data', (chunk) => {
            body += chunk;
          });
          response.on('end', () => {
            reject(new Error(`HTTP ${statusCode}: ${body}`));
          });
          return;
        }

        resolve(Readable.toWeb(response) as ReadableStream<Uint8Array>);
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (request.data !== undefined) {
        req.write(request.data);
      }

      req.end();
    });
  }

  return { send, sendStream };
}
