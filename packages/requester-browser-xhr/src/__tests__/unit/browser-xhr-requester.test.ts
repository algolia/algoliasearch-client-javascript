import { MethodEnum, Request } from '@algolia/requester-common';
import mock, { MockRequest, MockResponse } from 'xhr-mock';

import { createBrowserXhrRequester } from '../..';

const requester = createBrowserXhrRequester();

const timeoutRequest: Request = {
  url: 'missing-url-here',
  data: '',
  headers: {},
  method: 'GET',
  responseTimeout: 2,
  connectTimeout: 1,
};

const requestStub = {
  url: 'https://algolia-dns.net/foo?x-algolia-header=bar',
  method: MethodEnum.Post,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  data: JSON.stringify({ foo: 'bar' }),
  responseTimeout: 1,
  connectTimeout: 2,
};

describe('status code handling', () => {
  beforeEach(() => mock.setup());
  afterEach(() => mock.teardown());

  it('sends requests', async () => {
    expect.assertions(3);

    mock.post(
      'https://algolia-dns.net/foo?x-algolia-header=bar',
      (req: MockRequest, res: MockResponse): MockResponse => {
        expect(req.method()).toEqual('POST');

        expect(req.header('Content-Type')).toEqual('application/x-www-form-urlencoded');

        expect(req.body()).toEqual(JSON.stringify({ foo: 'bar' }));

        return res.status(200);
      }
    );

    await requester.send(requestStub);
  });

  it('resolves status 200', async () => {
    const body = JSON.stringify({ foo: 'bar' });

    mock.post('https://algolia-dns.net/foo?x-algolia-header=bar', {
      status: 200,
      body,
    });

    const response = await requester.send(requestStub);

    expect(response.status).toBe(200);
    expect(response.content).toBe(body);
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 300', async () => {
    const reason = 'Multiple Choices';

    mock.post('https://algolia-dns.net/foo?x-algolia-header=bar', {
      status: 300,
      reason,
    });

    const response = await requester.send(requestStub);

    expect(response.status).toBe(300);
    expect(response.content).toBe(''); // No body returned here on xhr
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 400', async () => {
    const body = { message: 'Invalid Application-Id or API-Key' };

    mock.post('https://algolia-dns.net/foo?x-algolia-header=bar', {
      status: 400,
      body: JSON.stringify(body),
    });

    const response = await requester.send(requestStub);

    expect(response.status).toBe(400);
    expect(response.content).toBe(JSON.stringify(body));
    expect(response.isTimedOut).toBe(false);
  });

  it('handles the protocol', async () => {
    const body = JSON.stringify({ foo: 'bar' });

    mock.post('http://localhost/', {
      status: 200,
      body,
    });

    const response = await requester.send({
      ...requestStub,
      url: 'http://localhost',
    });

    expect(response.status).toBe(200);
    expect(response.content).toBe('{"foo":"bar"}');
    expect(response.isTimedOut).toBe(false);
  });
});

describe('timeout handling', () => {
  it('connection timeouts with the given 1 seconds connection timeout', async () => {
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

  it('conection timeouts with the given 2 seconds connection timeout', async () => {
    const before = Date.now();
    const response = await requester.send({
      ...timeoutRequest,
      ...{ connectTimeout: 2, url: 'http://www.google.com:81' },
    });

    const now = Date.now();

    expect(response.content).toBe('Connection timeout');
    expect(now - before).toBeGreaterThan(1990);
    expect(now - before).toBeLessThan(2200);
  });

  it('socket timeouts if response dont appears before the timeout with 2 seconds timeout', async () => {
    const before = Date.now();

    const response = await requester.send({
      ...timeoutRequest,
      ...{ responseTimeout: 2, url: 'http://localhost:1111/' },
    });

    const now = Date.now();

    expect(now - before).toBeGreaterThan(1990);
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
});

describe('error handling', () => {
  it('resolves dns not found', async () => {
    const request = {
      url: 'https://this-dont-exist.algolia.com',
      method: MethodEnum.Post,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({ foo: 'bar' }),
      responseTimeout: 2,
      connectTimeout: 1,
    };

    const response = await requester.send(request);

    expect(response.status).toBe(0);
    expect(response.content).toBe('Network request failed');
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves general network errors', async () => {
    mock.post('https://algolia-dns.net/foo?x-algolia-header=bar', () =>
      Promise.reject(new Error('This is a general error'))
    );

    const response = await requester.send(requestStub);

    expect(response.status).toBe(0);
    expect(response.content).toBe('Network request failed');
    expect(response.isTimedOut).toBe(false);
  });
});
