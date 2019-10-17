import { NullLogger } from '@algolia/logger-types';
import { Method, Request as RequesterRequest, Requester, Response } from '@algolia/requester-types';
import { Call, Host } from '@algolia/transporter-types';
import { instance } from 'ts-mockito';

import { Transporter } from '../Transporter';

export class FakeRequester implements Requester {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public send(request: RequesterRequest): Readonly<Promise<Response>> {
    return new Promise((resolve): void => {
      resolve({
        content: '{"hits": [{"name": "Star Wars"}]}',
        status: 200,
        isTimedOut: false,
      });
    });
  }
}

export class TestTransporter extends Transporter {
  public readonly _hosts: readonly Host[];

  public constructor(options: any) {
    super(options);

    this._hosts = options.hosts;
  }
}

export class Fixtures {
  public static requester(): FakeRequester {
    return new FakeRequester();
  }

  public static transporter(requester: Requester, options: any = {}): TestTransporter {
    const hosts = [
      { url: 'read.com', accept: Call.Read },
      { url: 'write.com', accept: Call.Write },
      { url: 'read-and-write.com', accept: Call.Any },
    ];

    return new TestTransporter({
      hosts: hosts.map(host => new Host(host)),
      requester: instance(requester),
      logger: new NullLogger(),
      responsesCache: options.responsesCache,
      hostsCache: options.hostsCache,
      requestsCache: options.requestsCache,
      timeouts: {
        read: 2,
        write: 30,
      },
      headers: {
        'X-Default-Header': 'Default value',
      },
    });
  }

  public static transporterRequest() {
    return {
      method: Method.Post,
      path: 'save',
      data: {},
      cacheable: false,
    };
  }

  public static requesterRequest() {
    const headers: { readonly [key: string]: string } = {
      'X-Default-Header': 'Default value',
    };

    return {
      data: '',
      headers,
      method: Method.Post,
      url: 'https://specify-call-type.com/save',
      timeout: 2,
    };
  }
}
