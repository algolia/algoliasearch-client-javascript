import { EndRequest, Response } from './types';
import * as http from 'http';
import * as https from 'https';

export class Requester {
  private httpAgent: http.Agent;
  private httpsAgent: https.Agent;

  constructor() {
    this.httpAgent = new http.Agent({ keepAlive: true });
    this.httpsAgent = new https.Agent({ keepAlive: true });
  }

  async send(request: EndRequest): Promise<Response> {
    return new Promise((resolve) => {
      const url = new URL(request.url);

      const path = url.search === null ? url.pathname : `${url.pathname}?${url.search}`;

      const options: https.RequestOptions = {
        agent: url.protocol === 'https:' ? this.httpsAgent : this.httpAgent,
        hostname: url.hostname,
        path,
        method: request.method,
        headers: request.headers,
        ...(url.port !== undefined ? { port: url.port || '' } : {}),
      };

      const req = (url.protocol === 'https:' ? https : http).request(options, (response) => {
        let contentBuffers: Buffer[] = [];

        response.on('data', (chunk) => {
          contentBuffers = contentBuffers.concat(chunk);
        });

        response.on('end', () => {
          clearTimeout(connectTimeout);
          clearTimeout(responseTimeout as NodeJS.Timeout);

          resolve({
            status: response.statusCode || 0,
            content: Buffer.concat(contentBuffers).toString(),
            isTimedOut: false,
          });
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
        }, timeout * 1000);
      };

      const connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');

      let responseTimeout: NodeJS.Timeout | undefined;

      req.on('error', (error) => {
        clearTimeout(connectTimeout);
        clearTimeout(responseTimeout!);
        resolve({ status: 0, content: error.message, isTimedOut: false });
      });

      req.once('response', () => {
        clearTimeout(connectTimeout);
        responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
      });

      if (request.data !== undefined) {
        req.write(request.data);
      }

      req.end();
    });
  }
}
