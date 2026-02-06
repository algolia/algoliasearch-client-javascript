import { MethodEnum, Request } from '@algolia/requester-common';
import nock from 'nock';
// @ts-ignore
import { Readable } from 'readable-stream';
import * as zlib from 'zlib';

import { createNodeHttpRequester } from '../..';

const requester = createNodeHttpRequester();

const headers = {
  'content-type': 'application/x-www-form-urlencoded',
};

const timeoutRequest: Request = {
  url: 'missing-url-here',
  data: '',
  headers: {},
  method: 'GET',
  responseTimeout: 5,
  connectTimeout: 2,
};

const requestStub: Request = {
  url: 'https://algolia-dns.net/foo?x-algolia-header=foo',
  method: MethodEnum.Post,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: JSON.stringify({ foo: 'bar' }),
  responseTimeout: 2,
  connectTimeout: 1,
};

describe('status code handling', () => {
  it('sends requests', async () => {
    const body = JSON.stringify({ foo: 'bar' });

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, body);

    const response = await requester.send(requestStub);

    expect(response.content).toEqual(JSON.stringify({ foo: 'bar' }));
  });

  it('resolves status 200', async () => {
    const body = JSON.stringify({ foo: 'bar' });

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, body);

    const response = await requester.send(requestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe(body);
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 300', async () => {
    const reason = 'Multiple Choices';

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(300, reason);

    const response = await requester.send(requestStub);

    expect(response.status).toBe(300);
    expect(response.content).toBe(reason);
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 400', async () => {
    const body = { message: 'Invalid Application-Id or API-Key' };

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(400, JSON.stringify(body));

    const response = await requester.send(requestStub);

    expect(response.status).toBe(400);
    expect(response.content).toBe(JSON.stringify(body));
    expect(response.isTimedOut).toBe(false);
  });

  it('handles chunked responses inside unicode character boundaries', async () => {
    const testdata = Buffer.from('äöü');

    // create a test response stream that is chunked inside a unicode character
    function* generate() {
      yield testdata.slice(0, 3);
      yield testdata.slice(3);
    }

    const testStream = Readable.from(generate());

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, testStream);

    const response = await requester.send(requestStub);

    expect(response.content).toEqual(testdata.toString());
  });
});

describe('timeout handling', () => {
  it('timeouts with the given 1 seconds connection timeout', async () => {
    const before = Date.now();
    const response = await requester.send({
      ...timeoutRequest,
      ...{ connectTimeout: 1, url: 'http://www.google.com:81' },
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
      ...{ connectTimeout: 2, url: 'http://www.google.com:81' },
    });

    const now = Date.now();

    expect(response.content).toBe('Connection timeout');
    expect(now - before).toBeGreaterThan(1999);
    expect(now - before).toBeLessThan(2200);
  });

  it('socket timeouts if response dont appears before the timeout with 2 seconds timeout', async () => {
    const before = Date.now();

    const response = await requester.send({
      ...timeoutRequest,
      ...{ responseTimeout: 2, url: 'http://localhost:1111/' },
    });

    const now = Date.now();

    expect(now - before).toBeGreaterThan(1999);
    expect(now - before).toBeLessThan(2200);
    expect(response.content).toBe('Socket timeout');
  });

  it('socket timeouts if response dont appears before the timeout with 3 seconds timeout', async () => {
    const before = Date.now();
    const response = await requester.send({
      ...timeoutRequest,
      ...{
        responseTimeout: 3,
        url: 'http://localhost:1111',
      },
    });

    const now = Date.now();

    expect(response.content).toBe('Socket timeout');
    expect(now - before).toBeGreaterThan(2999);
    expect(now - before).toBeLessThan(3200);
  });

  it('do not timeouts if response appears before the timeout', async () => {
    const request = Object.assign({}, requestStub);
    const before = Date.now();
    const response = await requester.send({
      ...request,
      url: 'http://localhost:1111',
      responseTimeout: 6, // the fake server sleeps for 5 seconds...
    });

    const now = Date.now();

    expect(response.isTimedOut).toBe(false);
    expect(response.status).toBe(200);
    expect(response.content).toBe('{"foo": "bar"}');
    expect(now - before).toBeGreaterThan(4999);
    expect(now - before).toBeLessThan(5200);
  });

  it('can be destroyed', async () => {
    // Can be destroyed without being used.
    await expect(requester.destroy()).resolves.toBeUndefined();

    await requester.send({
      ...requestStub,
      url: 'http://localhost:1111',
      responseTimeout: 6, // the fake server sleeps for 5 seconds...
    });

    // Can be destroyed after being used.
    await expect(requester.destroy()).resolves.toBeUndefined();

    // Can be destroyed more than once.
    await expect(requester.destroy()).resolves.toBeUndefined();

    // Can perform requests after being destroyed
    await requester.send({
      ...requestStub,
      url: 'http://localhost:1111',
      responseTimeout: 6, // the fake server sleeps for 5 seconds...
    });
  });
});

describe('error handling', (): void => {
  it('resolves dns not found', async () => {
    const request = {
      url: 'https://this-dont-exist.algolia.com',
      method: MethodEnum.Post,
      headers: {
        'X-Algolia-Application-Id': 'ABCDE',
        'X-Algolia-API-Key': '12345',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({ foo: 'bar' }),
      responseTimeout: 2,
      connectTimeout: 1,
    };

    const response = await requester.send(request);

    expect(response.status).toBe(0);
    expect(response.content).toContain('');
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves general network errors', async () => {
    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .replyWithError('This is a general error');

    const response = await requester.send(requestStub);

    expect(response.status).toBe(0);
    expect(response.content).toBe('This is a general error');
    expect(response.isTimedOut).toBe(false);
  });
});

describe('requesterOptions', () => {
  it('allows to pass requesterOptions', async () => {
    const body = JSON.stringify({ foo: 'bar' });
    const requesterTmp = createNodeHttpRequester({
      requesterOptions: {
        headers: {
          'x-algolia-foo': 'bar',
        },
      },
    });

    nock('https://algolia-dns.net', {
      reqheaders: {
        ...headers,
        'x-algolia-foo': 'bar',
      },
    })
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, body);

    const response = await requesterTmp.send(requestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe(body);
  });
});

describe('gzip compression', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  const gzipRequestStub: Request = {
    url: 'https://algolia-dns.net/foo?x-algolia-header=foo',
    method: MethodEnum.Post,
    headers: {
      'accept-encoding': 'gzip',
      'content-type': 'application/json',
    },
    data: JSON.stringify({ foo: 'bar' }),
    responseTimeout: 2,
    connectTimeout: 1,
  };

  const isGzipBodyMatching = (expected: string) => (body: string): boolean => {
    const decompressed = zlib.gunzipSync(Buffer.from(body, 'hex')).toString();

    return decompressed === expected;
  };

  it('compresses request body when accept-encoding: gzip header is present', async () => {
    const expectedBody = JSON.stringify({ foo: 'bar' });

    nock('https://algolia-dns.net', {
      reqheaders: {
        'content-encoding': 'gzip',
        'accept-encoding': 'gzip',
      },
    })
      .post('/foo', isGzipBodyMatching(expectedBody))
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, 'ok');

    const response = await requester.send(gzipRequestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe('ok');
  });

  it('does not compress request body when accept-encoding header is absent', async () => {
    const body = JSON.stringify({ foo: 'bar' });

    nock('https://algolia-dns.net')
      .post('/foo', body)
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, 'ok');

    const response = await requester.send(requestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe('ok');
  });

  it('decompresses gzip response when content-encoding: gzip header is present', async () => {
    const responseBody = JSON.stringify({ foo: 'bar' });
    const gzipBuffer = zlib.gzipSync(responseBody);

    nock('https://algolia-dns.net')
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, gzipBuffer, { 'content-encoding': 'gzip' });

    const response = await requester.send(gzipRequestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe(responseBody);
    expect(response.isTimedOut).toBe(false);
  });

  it('does not decompress response when content-encoding header is absent', async () => {
    const responseBody = JSON.stringify({ hello: 'world' });

    nock('https://algolia-dns.net', {
      reqheaders: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
      .post('/foo', JSON.stringify({ foo: 'bar' }))
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, responseBody);

    const response = await requester.send(requestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe(responseBody);
    expect(response.isTimedOut).toBe(false);
  });

  it('handles decompression errors gracefully', async () => {
    const invalidGzipData = Buffer.from('not-gzip-data');

    nock('https://algolia-dns.net')
      .post('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, invalidGzipData, { 'content-encoding': 'gzip' });

    const response = await requester.send(gzipRequestStub);

    expect(response.status).toBe(0);
    expect(response.isTimedOut).toBe(false);
    expect(response.content).toBeTruthy();
  });

  it('does not compress request body when data is undefined', async () => {
    const getRequest: Request = {
      url: 'https://algolia-dns.net/foo?x-algolia-header=foo',
      method: MethodEnum.Get,
      headers: {
        'accept-encoding': 'gzip',
      },
      data: undefined,
      responseTimeout: 2,
      connectTimeout: 1,
    };

    nock('https://algolia-dns.net')
      .get('/foo')
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, 'ok');

    const response = await requester.send(getRequest);

    expect(response.status).toBe(200);
    expect(response.content).toBe('ok');
  });

  it('handles accept-encoding with multiple values (gzip, deflate)', async () => {
    const multiEncodingRequest: Request = {
      ...gzipRequestStub,
      headers: {
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
      },
    };

    const expectedBody = JSON.stringify({ foo: 'bar' });

    nock('https://algolia-dns.net', {
      reqheaders: {
        'content-encoding': 'gzip',
      },
    })
      .post('/foo', isGzipBodyMatching(expectedBody))
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, 'ok');

    const response = await requester.send(multiEncodingRequest);

    expect(response.status).toBe(200);
    expect(response.content).toBe('ok');
  });

  it('full round-trip: compressed request + gzip response', async () => {
    const requestBody = JSON.stringify({ foo: 'bar' });
    const responseBody = JSON.stringify({ result: 'success' });
    const gzipResponseBuffer = zlib.gzipSync(responseBody);

    nock('https://algolia-dns.net', {
      reqheaders: {
        'content-encoding': 'gzip',
        'accept-encoding': 'gzip',
      },
    })
      .post('/foo', isGzipBodyMatching(requestBody))
      .query({ 'x-algolia-header': 'foo' })
      .reply(200, gzipResponseBuffer, { 'content-encoding': 'gzip' });

    const response = await requester.send(gzipRequestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe(responseBody);
    expect(response.isTimedOut).toBe(false);
  });
});
