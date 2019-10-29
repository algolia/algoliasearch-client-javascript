import { Method } from '@algolia/requester-common/src/types/Method';
import { Request } from '@algolia/requester-common/src/types/Request';

export default class Fixtures {
  public static request(): Request {
    return {
      url: 'https://algolia-dns.net/foo?x-algolia-header=foo',
      method: Method.Post,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({ foo: 'bar' }),
      timeout: 2,
    };
  }
}
