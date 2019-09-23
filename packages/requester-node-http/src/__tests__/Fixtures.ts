import { Method, Request } from '@algolia/requester-types';

export default class Fixtures {
  public static request(): Request {
    return {
      url: 'https://algolia-dns.net/foo',
      method: Method.Post,
      headers: {
        'X-Algolia-Application-Id': 'ABCDE',
        'X-Algolia-API-Key': '12345',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ foo: 'bar' }),
      timeout: 2,
    };
  }
}
