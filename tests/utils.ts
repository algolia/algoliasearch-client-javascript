import http from 'http';

import type { EndRequest, Headers } from '@algolia/client-common';

/**
 * Base URL in tests.
 */
export const BASE_URL = 'https://algolia-dns.net/foo?x-algolia-header=bar';

/**
 * Default headers for tests.
 */
export const headers: Headers = {
  'content-type': 'text/plain',
};

/**
 * Default timeout request used for tests.
 */
export const timeoutRequest: EndRequest = {
  url: 'missing-url-here',
  data: '',
  headers: {},
  method: 'GET',
  responseTimeout: 5000,
  connectTimeout: 2000,
};

/**
 * Default request used for tests.
 */
export const requestStub: EndRequest = {
  url: BASE_URL,
  method: 'POST',
  headers,
  data: getStringifiedBody(),
  responseTimeout: 2000,
  connectTimeout: 1000,
};

export const testQueryHeader: Headers = { 'x-algolia-header': 'bar' };
export const testQueryBaseUrl = 'https://algolia-dns.net';

/**
 * Returns a JSON strigified body.
 */
export function getStringifiedBody(
  body: Record<string, any> = { foo: 'bar' }
): string {
  return JSON.stringify(body);
}

/**
 * Creates a test server.
 */
export function createTestServer(): http.Server {
  return http.createServer(function (req, res) {
    if (req.url?.endsWith('/connection_timeout')) {
      setTimeout(() => {
        res.writeHead(200, {
          'content-type': 'text/plain',
          'access-control-allow-origin': '*',
          'x-powered-by': 'nodejs',
        });

        res.write('{"foo": "bar"}');
        res.end();
      }, 5000);
    } else {
      res.writeHead(200, {
        'content-type': 'text/plain',
        'access-control-allow-origin': '*',
        'x-powered-by': 'nodejs',
      });

      res.write('{"foo":');

      setTimeout(() => {
        res.write(' "bar"');
      }, 1000);

      setTimeout(() => {
        res.write('}');
        res.end();
      }, 5000);
    }
  });
}
