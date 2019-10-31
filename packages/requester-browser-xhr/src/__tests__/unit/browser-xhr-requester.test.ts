import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { Request } from '@algolia/requester-common/types/Request';
import mock, { MockRequest, MockResponse } from 'xhr-mock';

import { createBrowserXhrRequester } from '../..';
import Fixtures from '../Fixtures';

const timeoutRequest: Request = {
  url: 'https://google.com:81/',
  data: '',
  headers: {},
  method: 'POST',
  timeout: 1,
};

describe('status code handling', (): void => {
  beforeEach(() => mock.setup());
  afterEach(() => mock.teardown());

  it('sends requests', async () => {
    const requester = createBrowserXhrRequester();
    const request = Fixtures.request();

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

    await requester.send(request);
  });

  it('resolves status 200', async () => {
    const requester = createBrowserXhrRequester();
    const body = JSON.stringify({ foo: 'bar' });

    mock.post('https://algolia-dns.net/foo?x-algolia-header=bar', {
      status: 200,
      body,
    });

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(200);
    expect(response.content).toBe(body);
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 300', async () => {
    const requester = createBrowserXhrRequester();
    const reason = 'Multiple Choices';

    mock.post('https://algolia-dns.net/foo?x-algolia-header=bar', {
      status: 300,
      reason,
    });

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(300);
    expect(response.content).toBe(''); // No body returned here on xhr
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 400', async () => {
    const requester = createBrowserXhrRequester();

    const body = { message: 'Invalid Application-Id or API-Key' };

    mock.post('https://algolia-dns.net/foo?x-algolia-header=bar', {
      status: 400,
      body: JSON.stringify(body),
    });

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(400);
    expect(response.content).toBe(JSON.stringify(body));
    expect(response.isTimedOut).toBe(false);
  });
});

describe('timeout handling', () => {
  const requester = createBrowserXhrRequester();

  it('timouts if response dont appears before the timeout with the given 1 seconds timeout', async () => {
    const before = Date.now();
    await requester.send({
      ...timeoutRequest,
      ...{ timeout: 1 },
    });

    const now = Date.now();

    expect(now - before).toBeGreaterThan(999);
    expect(now - before).toBeLessThan(1200);
  });

  it('timouts if response dont appears before the timeout with the given 2 seconds timeout', async () => {
    const before = Date.now();
    await requester.send({
      ...timeoutRequest,
      ...{ timeout: 2 },
    });

    const now = Date.now();

    expect(now - before).toBeGreaterThan(1999);
    expect(now - before).toBeLessThan(2200);
  });

  it('timouts with a response code 0 and no content', async () => {
    const response = await requester.send(timeoutRequest);

    expect(response.status).toBe(0);
    expect(response.content).toContain('');
    expect(response.isTimedOut).toBe(true);
  });

  it('do not timeouts if response appears before the timeout', async () => {
    const request = Fixtures.request();

    // @ts-ignore
    request.url = 'https://bh4d9od16a-dsn.algolia.net/1/indexes';
    // @ts-ignore
    request.method = 'GET';

    const response = await requester.send(request);

    expect(response.isTimedOut).toBe(false);
    expect(response.status).toBe(403);
    expect(response.content).toBe(
      JSON.stringify({
        message: 'Invalid Application-ID or API key',
        status: 403,
      })
    );
  });
});

describe('error handling', (): void => {
  it('resolves dns not found', async () => {
    const requester = createBrowserXhrRequester();

    const request = {
      url: 'https://this-dont-exist.algolia.com',
      method: MethodEnum.Post,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({ foo: 'bar' }),
      timeout: 2,
    };

    const response = await requester.send(request);

    expect(response.status).toBe(0);
    expect(response.content).toBe('Network request failed');
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves general network errors', async () => {
    const requester = createBrowserXhrRequester();

    mock.post('https://algolia-dns.net/foo?x-algolia-header=bar', () =>
      Promise.reject(new Error('This is a general error'))
    );

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(0);
    expect(response.content).toBe('Network request failed');
    expect(response.isTimedOut).toBe(false);
  });
});
