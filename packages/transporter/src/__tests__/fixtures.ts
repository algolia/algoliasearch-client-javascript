import { createNullCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { encode } from '@algolia/client-common';
import {
  MethodEnum,
  Request,
  Request as RequesterRequest,
  Requester,
  Response,
} from '@algolia/requester-common';

import { CallEnum, Transporter } from '..';
import algoliasearch from '../../../algoliasearch/src/builds/browser';
import { version } from '../../../client-common/src/version';

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
      return algoliasearch('appId', 'apiKey', {
        hosts: [
          { url: 'read.com', accept: CallEnum.Read },
          { url: 'write.com', accept: CallEnum.Write },
          { url: 'read-and-write.com' },
        ],
        requester,
        hostsCache: createInMemoryCache(),
        requestsCache: createNullCache(),
        responsesCache: createNullCache(),
        headers: {
          'X-Default-Header': 'Default value',
        },
        queryParameters: {},
        timeouts: {
          read: 2,
          write: 30,
          connect: 1,
        },
        ...options,
      }).transporter;
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
      return this.request({
        connectTimeout: 1,
        responseTimeout: 2,
        url: 'https://read.com/save',
        ...options,
      });
    },

    writeRequest(options: any = {}) {
      return this.request({
        connectTimeout: 1,
        responseTimeout: 30,
        url: 'https://write.com/save',
        ...options,
      });
    },

    readAndWriteRequest(options: any = {}) {
      return this.request({
        url: 'https://read-and-write.com/save',
        ...options,
      });
    },

    request(options: any = {}): Request {
      const headers: Readonly<Record<string, string>> = {
        'x-algolia-api-key': 'apiKey',
        'x-algolia-application-id': 'appId',
        'content-type': 'application/x-www-form-urlencoded',
        'x-default-header': 'Default value',
      };

      if (options.url !== undefined) {
        const userAgent = encode(
          '%s=%s',
          'x-algolia-agent',
          `Algolia for JavaScript (${version}); Browser`
        );

        const hasQueryParametersAlready = options.url.includes('?');

        // eslint-disable-next-line no-param-reassign
        options.url = options.url.replace(
          `.com/save${hasQueryParametersAlready ? '?' : ''}`,
          `.com/save?${userAgent}${hasQueryParametersAlready ? '&' : ''}`
        );
      }

      return {
        data: '{}',
        headers,
        method: MethodEnum.Post,
        connectTimeout: 1,
        responseTimeout: 2,
        ...options,
      };
    },
  };
}
