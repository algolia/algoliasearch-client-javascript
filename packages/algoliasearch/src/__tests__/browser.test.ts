import { createInMemoryCache } from '@algolia/cache-in-memory';
import { version } from '@algolia/client-common';
import { createUserAgent } from '@algolia/transporter';

import algoliasearch from '../builds/browser';

const client = algoliasearch('appId', 'apiKey');

describe('algoliasearch for browser', () => {
  it('sets default headers', () => {
    expect(client.transporter.headers).toEqual({
      'content-type': 'application/x-www-form-urlencoded',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });
  });

  it('sets default query pameters', () => {
    expect(client.transporter.queryParameters).toEqual({});
  });

  it('sets default user agent', () => {
    expect(client.transporter.userAgent.value).toEqual(
      `Algolia for JavaScript (${version}); Browser`
    );
  });

  it('allows to customize options', () => {
    const cache = createInMemoryCache();
    const userAgent = createUserAgent('0.2.0');

    const customClient = algoliasearch('appId', 'apiKey', {
      hostsCache: cache,
      requestsCache: cache,
      userAgent,
      timeouts: {
        connect: 45,
        read: 46,
        write: 47,
      },
    });

    expect(customClient.transporter.hostsCache).toBe(cache);
    expect(customClient.transporter.requestsCache).toBe(cache);
    expect(customClient.transporter.userAgent).toBe(userAgent);
    expect(customClient.transporter.timeouts.connect).toBe(45);
    expect(customClient.transporter.timeouts.read).toBe(46);
    expect(customClient.transporter.timeouts.write).toBe(47);
  });
});
