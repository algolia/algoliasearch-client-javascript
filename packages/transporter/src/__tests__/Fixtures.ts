import {
  Requester,
  Request as RequesterRequest,
  Response,
  Method,
} from '@algolia/requester-types';
import { Transporter } from '../Transporter';
import { CallType, Host } from '@algolia/transporter-types';
import { instance } from 'ts-mockito';
import { NullLogger } from '../../../logger-types/src';

export class FakeRequester implements Requester {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public send(request: RequesterRequest): Promise<Response> {
    return new Promise((resolve): void => {
      resolve({
        content: '{"hits": [{"name": "Star Wars"}]}',
        status: 200,
        isTimedOut: false,
      });
    });
  }
}

export class Fixtures {
  public static requester(): FakeRequester {
    return new FakeRequester();
  }

  public static transporter(requester: Requester): Transporter {
    const hosts: Host[] = [
      { url: 'read.com', accept: CallType.Read },
      { url: 'write.com', accept: CallType.Write },
      { url: 'read-and-write.com', accept: CallType.Any },
    ];

    return new Transporter({
      hosts,
      requester: instance(requester),
      logger: new NullLogger(),
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
    };
  }

  public static requesterRequest() {
    const headers: { [key: string]: string } = {
      'X-Default-Header': 'Default value',
    };

    return {
      data: '{}',
      headers,
      method: Method.Post,
      url: 'https://specify-call-type.com/save',
      timeout: 2,
    };
  }
}
