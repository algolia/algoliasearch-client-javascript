import { BrowserXhrRequester } from '../..';
import mock, { MockRequest, MockResponse } from 'xhr-mock';
import { Response, Method } from '@algolia/requester-types';
import Fixtures from '../Fixtures';

describe('Requester Browser Xhr', (): void => {
  beforeEach(() => mock.setup());
  afterEach(() => mock.teardown());

  it('It sends requests', () => {
    const requester = new BrowserXhrRequester();
    const request = Fixtures.request();

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

    return requester.send(request);
  });

  it('It resolves status 200', () => {
    const requester = new BrowserXhrRequester();
    const body = JSON.stringify({ foo: 'bar' });

    mock.post('https://algolia-dns.net/foo', {
      status: 200,
      body,
    });

    return requester
      .send(Fixtures.request())
      .then((response: Response): void => {
        expect(response.statusCode).toBe(200);
        expect(response.content).toBe(body);
        expect(response.isTimedOut).toBe(false);
      });
  });

  it('It resolves status 300', () => {
    const requester = new BrowserXhrRequester();
    const reason = 'Multiple Choices';

    mock.post('https://algolia-dns.net/foo', {
      status: 300,
      reason,
    });

    return requester
      .send(Fixtures.request())
      .then((response: Response): void => {
        expect(response.statusCode).toBe(300);
        expect(response.content).toBe('');
        expect(response.isTimedOut).toBe(false);
      });
  });

  it('It resolves status 400', () => {
    const requester = new BrowserXhrRequester();

    const body = { message: 'Invalid Application-Id or API-Key' };

    mock.post('https://algolia-dns.net/foo', {
      status: 400,
      body: JSON.stringify(body),
    });

    return requester
      .send(Fixtures.request())
      .then((response: Response): void => {
        expect(response.statusCode).toBe(400);
        expect(response.content).toBe(JSON.stringify(body));
        expect(response.isTimedOut).toBe(false);
      });
  });

  it('It resolves timeouts', () => {
    const requester = new BrowserXhrRequester();

    mock.get('https://algolia-dns.net/foo', () => new Promise(() => {}));

    const request = {
      url: 'https://algolia-dns.net/foo',
      method: Method.Get,
      data: JSON.stringify({}),
      headers: {},
      timeout: 1,
    };

    return requester.send(request).then((response: Response): void => {
      expect(response.statusCode).toBe(0);
      expect(response.content).toBe('');
      expect(response.isTimedOut).toBe(true);
    });
  });
});
