import http from 'http';
import { Readable } from 'stream';

import type { EndRequest, Headers } from '@algolia/client-common';
import nock from 'nock';

import { createHttpRequester } from '../..';

const requester = createHttpRequester();
const BASE_URL = 'https://algolia-dns.net/foo?x-algolia-header=bar';

function getStringifiedBody(
  body: Record<string, any> = { foo: 'bar' }
): string {
  return JSON.stringify(body);
}

const headers = {
  'content-type': 'text/plain',
};

const timeoutRequest: EndRequest = {
  url: 'missing-url-here',
  data: '',
  headers: {},
  method: 'GET',
  responseTimeout: 5000,
  connectTimeout: 2000,
};

const requestStub: EndRequest = {
  url: BASE_URL,
  method: 'POST',
  headers,
  data: getStringifiedBody(),
  responseTimeout: 2000,
  connectTimeout: 1000,
};

describe('status code handling', () => {
  const queryHeader: Headers = { 'x-algolia-header': 'bar' };
  const queryBaseUrl = 'https://algolia-dns.net';

  it('sends requests', async () => {
    const body = getStringifiedBody();

    nock(queryBaseUrl, { reqheaders: headers })
      .post('/foo')
      .query(queryHeader)
      .reply(200, body);

    const response = await requester.send(requestStub);

    expect(response.content).toEqual(body);
  });

  it('resolves status 200', async () => {
    const body = getStringifiedBody();

    nock(queryBaseUrl, { reqheaders: headers })
      .post('/foo')
      .query(queryHeader)
      .reply(200, body);

    const response = await requester.send(requestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe(body);
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 300', async () => {
    const reason = 'Multiple Choices';

    nock(queryBaseUrl, { reqheaders: headers })
      .post('/foo')
      .query(queryHeader)
      .reply(300, reason);

    const response = await requester.send(requestStub);

    expect(response.status).toBe(300);
    expect(response.content).toBe(reason);
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 400', async () => {
    const body = getStringifiedBody({
      message: 'Invalid Application-Id or API-Key',
    });

    nock(queryBaseUrl, { reqheaders: headers })
      .post('/foo')
      .query(queryHeader)
      .reply(400, body);

    const response = await requester.send(requestStub);

    expect(response.status).toBe(400);
    expect(response.content).toBe(body);
    expect(response.isTimedOut).toBe(false);
  });

  it('handles chunked responses inside unicode character boundaries', async () => {
    const data = Buffer.from('äöü');

    // create a test response stream that is chunked inside a unicode character
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function* generate() {
      yield data.slice(0, 3);
      yield data.slice(3);
    }

    const testStream = Readable.from(generate());

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .query(queryHeader)
      .reply(200, testStream);

    const response = await requester.send(requestStub);

    expect(response.content).toEqual(data.toString());
  });
});

describe('timeout handling', () => {
  let server: http.Server;
  // setup http server to test timeout
  beforeAll(() => {
    server = http.createServer(function (_req, res) {
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
    });

    server.listen('1111');
  });

  afterAll((done) => {
    server.close(() => done());
  });

  it('timeouts with the given 1 seconds connection timeout', async () => {
    const before = Date.now();
    const response = await requester.send({
      ...timeoutRequest,
      connectTimeout: 1000,
      url: 'http://www.google.com:81',
    });

    const now = Date.now();

    expect(response.content).toBe('Connection timeout');
    expect(now - before).toBeGreaterThan(999);
    expect(now - before).toBeLessThan(1200);
  });

  it('connection timeouts with the given 2 seconds connection timeout', async () => {
    const before = Date.now();
    const response = await requester.send({
      ...timeoutRequest,
      connectTimeout: 2000,
      url: 'http://www.google.com:81',
    });

    const now = Date.now();

    expect(response.content).toBe('Connection timeout');
    expect(now - before).toBeGreaterThan(1999);
    expect(now - before).toBeLessThan(2200);
  });

  it("socket timeouts if response don't appears before the timeout with 2 seconds timeout", async () => {
    const before = Date.now();

    const response = await requester.send({
      ...timeoutRequest,
      responseTimeout: 2000,
      url: 'http://localhost:1111',
    });

    const now = Date.now();

    expect(response.content).toBe('Socket timeout');
    expect(now - before).toBeGreaterThan(1999);
    expect(now - before).toBeLessThan(2200);
  });

  it("socket timeouts if response don't appears before the timeout with 3 seconds timeout", async () => {
    const before = Date.now();
    const response = await requester.send({
      ...timeoutRequest,
      responseTimeout: 3000,
      url: 'http://localhost:1111',
    });

    const now = Date.now();

    expect(response.content).toBe('Socket timeout');
    expect(now - before).toBeGreaterThan(2999);
    expect(now - before).toBeLessThan(3200);
  });

  it('do not timeouts if response appears before the timeout', async () => {
    const before = Date.now();
    const response = await requester.send({
      ...requestStub,
      url: 'http://localhost:1111',
      responseTimeout: 6000,
    });

    const now = Date.now();

    expect(response.isTimedOut).toBe(false);
    expect(response.status).toBe(200);
    expect(response.content).toBe('{"foo": "bar"}');
    expect(now - before).toBeGreaterThan(4999);
    expect(now - before).toBeLessThan(5200);
  }, 10000); // This is a long-running test, default server timeout is set to 5000ms
});

describe('error handling', (): void => {
  it('resolves dns not found', async () => {
    const request: EndRequest = {
      url: 'https://this-dont-exist.algolia.com',
      method: 'POST',
      headers: {
        'content-type': 'text/plain',
      },
      data: getStringifiedBody(),
      responseTimeout: 2000,
      connectTimeout: 1000,
    };

    const response = await requester.send(request);

    expect(response.status).toBe(0);
    expect(response.content).toContain('');
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves general network errors', async () => {
    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .query({ 'x-algolia-header': 'bar' })
      .replyWithError('This is a general error');

    const response = await requester.send(requestStub);

    expect(response.status).toBe(0);
    expect(response.content).toBe('This is a general error');
    expect(response.isTimedOut).toBe(false);
  });
});
