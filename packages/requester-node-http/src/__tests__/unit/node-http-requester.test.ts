import { NodeHttpRequester } from '../../..';
import { Method } from '@algolia/requester-types';
import Fixtures from '../Fixtures';
import * as nock from 'nock';

const headers = {
  'x-algolia-application-id': 'ABCDE',
  'x-algolia-api-key': '12345',
  'content-type': 'application/json',
};

describe('status code handling', (): void => {
  it('sends requests', async () => {
    const requester = new NodeHttpRequester();
    const request = Fixtures.request();
    const body = JSON.stringify({ foo: 'bar' });

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .reply(200, body);

    const response = await requester.send(request);

    expect(response.content).toEqual(JSON.stringify({ foo: 'bar' }));
  });

  it('resolves status 200', async () => {
    const requester = new NodeHttpRequester();
    const body = JSON.stringify({ foo: 'bar' });

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .reply(200, body);

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(200);
    expect(response.content).toBe(body);
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 300', async () => {
    const requester = new NodeHttpRequester();
    const reason = 'Multiple Choices';

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .reply(300, reason);

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(300);
    expect(response.content).toBe(reason);
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves status 400', async () => {
    const requester = new NodeHttpRequester();

    const body = { message: 'Invalid Application-Id or API-Key' };

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .reply(400, JSON.stringify(body));

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(400);
    expect(response.content).toBe(JSON.stringify(body));
    expect(response.isTimedOut).toBe(false);
  });

  it('timouts if response dont appears before the timeout', async () => {
    const requester = new NodeHttpRequester();

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .socketDelay(2100)
      .reply(200);

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(0);
    expect(response.content).toBe('');
    expect(response.isTimedOut).toBe(true);
  });

  it('do not timouts if response appears before the timeout', async () => {
    const requester = new NodeHttpRequester();

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .socketDelay(1900) // 3 seconds
      .reply(200);

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(200);
    expect(response.content).toBe('');
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves response if returned before a timeout', async () => {
    const requester = new NodeHttpRequester();

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .socketDelay(3000) // 3 seconds
      .reply(200);

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(0);
    expect(response.content).toBe('');
    expect(response.isTimedOut).toBe(true);
  });
});

describe('error handling', (): void => {
  it('resolves dns not found', async () => {
    const requester = new NodeHttpRequester();

    const request = {
      url: 'https://this-dont-exist.algolia.com',
      method: Method.Post,
      headers: {
        'X-Algolia-Application-Id': 'ABCDE',
        'X-Algolia-API-Key': '12345',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ foo: 'bar' }),
      timeout: 2,
    };

    const response = await requester.send(request);

    expect(response.status).toBe(0);
    expect(response.content).toBe('getaddrinfo ENOTFOUND this-dont-exist.algolia.com');
    expect(response.isTimedOut).toBe(false);
  });

  it('resolves general network errors', async () => {
    const requester = new NodeHttpRequester();

    nock('https://algolia-dns.net', { reqheaders: headers })
      .post('/foo')
      .replyWithError('This is a general error');

    const response = await requester.send(Fixtures.request());

    expect(response.status).toBe(0);
    expect(response.content).toBe('This is a general error');
    expect(response.isTimedOut).toBe(false);
  });
});
