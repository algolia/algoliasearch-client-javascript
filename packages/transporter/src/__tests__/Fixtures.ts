import { createNullCache } from '@algolia/cache-common/createNullCache';
import { encode } from '@algolia/client-common/helpers';
import { MethodEnum } from '@algolia/requester-common/types/MethodType';
import { Request as RequesterRequest } from '@algolia/requester-common/types/Request';
import { Requester } from '@algolia/requester-common/types/Requester';
import { Response } from '@algolia/requester-common/types/Response';
import algoliasearch from 'algoliasearch/builds/browser';
import { instance } from 'ts-mockito';

import { Transporter } from '../types';
import { CallEnum } from '../types/CallType';

export function createFakeRequester(): Requester {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    send(request: RequesterRequest): Readonly<Promise<Response>> {
      return new Promise((resolve): void => {
        resolve({
          content: '{"hits": [{"name": "Star Wars"}]}',
          status: 200,
          isTimedOut: false,
        });
      });
    },
  };
}

export function createFixtures() {
  return {
    requester(): Requester {
      return createFakeRequester();
    },

    transporter(requester: Requester, options: any = {}): Transporter {
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
    },

    transporterRequest() {
      return {
        method: MethodEnum.Post,
        path: 'save',
        data: {},
        cacheable: false,
      };
    },

    readRequest(options: any = {}) {
      return this.request({ timeout: 2, url: 'https://read.com/save', ...options });
    },

    writeRequest(options: any = {}) {
      return this.request({ timeout: 30, url: 'https://write.com/save', ...options });
    },

    writeAndWriteRequest(options: any = {}) {
      return this.request({ url: 'https://read-and-write.com/save', ...options });
    },

    request(options: any = {}) {
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
    },
  };
}
