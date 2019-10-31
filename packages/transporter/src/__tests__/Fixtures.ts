import { createNullCache } from '@algolia/cache-common/createNullCache';
import { encode } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { Request as RequesterRequest } from '@algolia/requester-common/types/Request';
import { Requester } from '@algolia/requester-common/types/Requester';
import { Response } from '@algolia/requester-common/types/Response';
import algoliasearch from 'algoliasearch/builds/browser';
import { instance } from 'ts-mockito';

import { createTransporter } from '../createTransporter';
import { CallEnum } from '../types/CallType';

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

export class Fixtures {
  public static requester(): FakeRequester {
    return new FakeRequester();
  }

  public static transporter(
    requester: Requester,
    options: any = {}
  ): ReturnType<typeof createTransporter> {
    const transporter = algoliasearch('appId', 'apiKey').transporter;

    transporter.setHosts([
      { url: 'read.com', accept: CallEnum.Read },
      { url: 'write.com', accept: CallEnum.Write },
      { url: 'read-and-write.com', accept: CallEnum.Any },
    ]);

    transporter.requester = instance(requester);
    transporter.hostsCache = createNullCache();
    transporter.requestsCache = createNullCache();
    transporter.responsesCache = createNullCache();
    transporter.headers = {
      'X-Default-Header': 'Default value',
    };
    transporter.queryParameters = {};
    transporter.timeouts = {
      read: 2,
      write: 30,
    };

    Object.keys(options).forEach(property => {
      transporter[property] = options[property];
    });

    return transporter;
  }

  public static transporterRequest() {
    return {
      method: MethodEnum.Post,
      path: 'save',
      data: {},
      cacheable: false,
    };
  }

  public static readRequest(options: any = {}) {
    return this.request({ timeout: 2, url: 'https://read.com/save', ...options });
  }

  public static writeRequest(options: any = {}) {
    return this.request({ timeout: 30, url: 'https://write.com/save', ...options });
  }

  public static writeAndWriteRequest(options: any = {}) {
    return this.request({ url: 'https://read-and-write.com/save', ...options });
  }

  private static request(options: any = {}) {
    const headers: { readonly [key: string]: string } = {
      'X-Default-Header': 'Default value',
    };

    if (options.url !== undefined) {
      // eslint-disable-next-line no-param-reassign
      options.url +=
        (options.url.includes('?') ? '&' : '?') +
        encode('%s=%s', 'x-algolia-agent', 'Algolia for JavaScript (4.0.0-alpha.0); Browser');
    }

    return {
      data: '',
      headers,
      method: MethodEnum.Post,
      timeout: 2,
      ...options,
    };
  }
}
