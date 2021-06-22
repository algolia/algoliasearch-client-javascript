import { createInMemoryCache } from '@algolia/cache-in-memory';
import { version } from '@algolia/client-common';
import { createStatelessHost, createUserAgent } from '@algolia/transporter';

import { TestSuite } from '../../../client-common/src/__tests__/TestSuite';

const recommend = new TestSuite('recommend').recommend;

describe('recommend', () => {
  test('has a version property', () => {
    expect(recommend.version).toBe(version);
    expect(recommend.version.startsWith('4.')).toBe(true);
  });

  test('gives access to appId', () => {
    expect(recommend('appId', 'apiKey').appId).toEqual('appId');
  });

  test('clearCache', async () => {
    const client = recommend('appId', 'apiKey');

    client.transporter.requestsCache.set('bla', 'blo');
    client.transporter.responsesCache.set('bla', 'blo');

    if (testing.isBrowser()) {
      await expect(
        client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
      ).resolves.toBe('blo');
      await expect(
        client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
      ).resolves.toBe('blo');
    } else {
      // node uses a null cache, so these assertions don't make sense there
      await expect(
        client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
      ).resolves.toBe('wrong');
      await expect(
        client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
      ).resolves.toBe('wrong');
    }

    await client.clearCache();

    await expect(
      client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('wrong');
    await expect(
      client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('wrong');
  });

  test('clearCache without promise', async () => {
    const client = recommend('appId', 'apiKey');

    client.transporter.requestsCache.set('bla', 'blo');
    client.transporter.responsesCache.set('bla', 'blo');

    if (testing.isBrowser()) {
      await expect(
        client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
      ).resolves.toBe('blo');
      await expect(
        client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
      ).resolves.toBe('blo');
    } else {
      // node uses a null cache, so these assertions don't make sense there
      await expect(
        client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
      ).resolves.toBe('wrong');
      await expect(
        client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
      ).resolves.toBe('wrong');
    }

    // no await, since default memory caches _actually_ are instant
    client.clearCache();

    await expect(
      client.transporter.requestsCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('wrong');
    await expect(
      client.transporter.responsesCache.get('bla', () => Promise.resolve('wrong'))
    ).resolves.toBe('wrong');
  });

  it('sets default headers and queryParameters', () => {
    const client = recommend('appId', 'apiKey');

    if (testing.isBrowser()) {
      expect(client.transporter.headers).toEqual({
        'content-type': 'application/x-www-form-urlencoded',
      });
      expect(client.transporter.queryParameters).toEqual({
        'x-algolia-application-id': 'appId',
        'x-algolia-api-key': 'apiKey',
      });
    } else {
      expect(client.transporter.headers).toEqual({
        'content-type': 'application/x-www-form-urlencoded',
        'x-algolia-application-id': 'appId',
        'x-algolia-api-key': 'apiKey',
      });
      expect(client.transporter.queryParameters).toEqual({});
    }
  });

  test('sets default user agent', () => {
    const client = recommend('appId', 'apiKey');

    if (testing.isBrowser()) {
      expect(client.transporter.userAgent.value).toEqual(
        `Algolia for JavaScript (${version}); Recommend (${version}); Browser`
      );
    } else {
      const nodeVersion = process.versions.node;

      expect(client.transporter.userAgent.value).toEqual(
        `Algolia for JavaScript (${version}); Recommend (${version}); Node.js (${nodeVersion})`
      );
    }
  });

  test('allows to customize options', () => {
    const client = recommend('appId', 'apiKey');
    const cache = createInMemoryCache();
    const userAgent = createUserAgent('0.2.0');

    const customClient = recommend('appId', 'apiKey', {
      hostsCache: cache,
      requestsCache: cache,
      userAgent,
      timeouts: {
        connect: 45,
        read: 46,
        write: 47,
      },
      queryParameters: {
        queryParameter: 'bar',
      },
      headers: {
        header: 'foo',
      },
      hosts: [{ url: 'foo.com' }],
    });

    // Then, on custom options, only the client is impacted
    expect(client.transporter.hostsCache).not.toBe(cache);
    expect(customClient.transporter.hostsCache).toBe(cache);

    expect(client.transporter.requestsCache).not.toBe(cache);
    expect(customClient.transporter.requestsCache).toBe(cache);
    expect(customClient.transporter.timeouts).toEqual({
      connect: 45,
      read: 46,
      write: 47,
    });

    expect(customClient.transporter.queryParameters).toEqual(
      expect.objectContaining({
        queryParameter: 'bar',
      })
    );
    expect(customClient.transporter.headers).toEqual(
      expect.objectContaining({
        'content-type': 'application/x-www-form-urlencoded',
        header: 'foo',
      })
    );
    expect(customClient.transporter.hosts).toEqual([createStatelessHost({ url: 'foo.com' })]);
  });

  test('can be destroyed', () => {
    const client = recommend('appId', 'apiKey');

    if (!testing.isBrowser()) {
      expect(client).toHaveProperty('destroy');
    }
  });
});
