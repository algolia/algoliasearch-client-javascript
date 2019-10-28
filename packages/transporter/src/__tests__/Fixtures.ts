import { NullCache } from '@algolia/cache-types';
import { Method, Request as RequesterRequest, Requester, Response } from '@algolia/requester-types';
import { encode } from '@algolia/support';
import { Call } from '@algolia/transporter';
import { instance } from 'ts-mockito';

import algoliasearch from '../../../algoliasearch/src/builds/browser';
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

export class Fixtures {
  public static requester(): FakeRequester {
    return new FakeRequester();
  }

  public static transporter(requester: Requester, options: any = {}): Transporter {
    const transporter = algoliasearch('appId', 'apiKey').transporter;

    transporter.setHosts([
      { url: 'read.com', accept: Call.Read },
      { url: 'write.com', accept: Call.Write },
      { url: 'read-and-write.com', accept: Call.Any },
    ]);

    transporter.requester = instance(requester);
    transporter.hostsCache = new NullCache();
    transporter.requestsCache = new NullCache();
    transporter.responsesCache = new NullCache();
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
      method: Method.Post,
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
      method: Method.Post,
      timeout: 2,
      ...options,
    };
  }
}
