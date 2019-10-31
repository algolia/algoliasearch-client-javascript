import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { Request } from '@algolia/requester-common/types/Request';

export default class Fixtures {
  public static request(): Request {
    return {
      url: 'https://algolia-dns.net/foo?x-algolia-header=foo',
      method: MethodEnum.Post,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify({ foo: 'bar' }),
      timeout: 2,
    };
  }
}
