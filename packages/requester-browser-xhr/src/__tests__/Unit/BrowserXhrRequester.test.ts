import { BrowserXhrRequester } from '../..';
import mock, { MockRequest, MockResponse } from 'xhr-mock';
import { Method } from '@algolia/requester-types';
import Fixtures from '../Fixtures';

describe('Requester Browser Xhr', (): void => {
  beforeEach(() => mock.setup());
  afterEach(() => mock.teardown());

  it('It sends requests', async () => {
    const requester = new BrowserXhrRequester();
    const request = Fixtures.request();

    expect.assertions(5);

    mock.post(
      'https://algolia-dns.net/foo',
      (req: MockRequest, res: MockResponse): MockResponse => {
        expect(req.method()).toEqual('POST');

        expect(req.header('X-Algolia-Application-Id')).toEqual('ABCDE');
        expect(req.header('X-Algolia-API-Key')).toEqual('12345');
        expect(req.header('Content-Type')).toEqual('application/json');

        expect(req.body()).toEqual(JSON.stringify({ foo: 'bar' }));

        return res.status(200);
      }
    );

    await requester.send(request);
  });

  it('It resolves status 200', async () => {
    const requester = new BrowserXhrRequester();
    const body = JSON.stringify({ foo: 'bar' });

    mock.post('https://algolia-dns.net/foo', {
      status: 200,
      body,
    });

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(200);
    expect(response.content).toBe(body);
    expect(response.isTimedOut).toBe(false);
  });

  it('It resolves status 300', async () => {
    const requester = new BrowserXhrRequester();
    const reason = 'Multiple Choices';

    mock.post('https://algolia-dns.net/foo', {
      status: 300,
      reason,
    });

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(300);
    expect(response.content).toBe('');
    expect(response.isTimedOut).toBe(false);
  });

  it('It resolves status 400', async () => {
    const requester = new BrowserXhrRequester();

    const body = { message: 'Invalid Application-Id or API-Key' };

    mock.post('https://algolia-dns.net/foo', {
      status: 400,
      body: JSON.stringify(body),
    });

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(400);
    expect(response.content).toBe(JSON.stringify(body));
    expect(response.isTimedOut).toBe(false);
  });

  it('It resolves timeouts', async () => {
    const requester = new BrowserXhrRequester();

    mock.get('https://algolia-dns.net/foo', () => new Promise(() => {}));

    const request = {
      url: 'https://algolia-dns.net/foo',
      method: Method.Get,
      data: JSON.stringify({}),
      headers: {},
      timeout: 1,
    };

    const response = await requester.send(request);

    expect(response.status).toBe(0);
    expect(response.content).toBe('');
    expect(response.isTimedOut).toBe(true);
  });
});
