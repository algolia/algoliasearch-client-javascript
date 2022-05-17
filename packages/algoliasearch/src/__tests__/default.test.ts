import { createInMemoryCache } from '@algolia/cache-in-memory';
import { version } from '@algolia/client-common';
import { createStatelessHost, createUserAgent } from '@algolia/transporter';

import { TestSuite } from '../../../client-common/src/__tests__/TestSuite';

const algoliasearch = new TestSuite('search').algoliasearch;
const client = algoliasearch('appId', 'apiKey');

describe('default preset', () => {
  it('has a version property', () => {
    expect(algoliasearch.version).toBe(version);
    expect(algoliasearch.version.startsWith('4.')).toBe(true);
  });

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
    if (testing.isBrowser()) {
      expect(client.transporter.userAgent.value).toEqual(
        `Algolia for JavaScript (${version}); Browser`
      );
    } else {
      const nodeVersion = process.versions.node;

      expect(client.transporter.userAgent.value).toEqual(
        `Algolia for JavaScript (${version}); Node.js (${nodeVersion})`
      );
    }
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
      queryParameters: {
        queryParameter: 'bar',
      },
      headers: {
        header: 'foo',
      },
      hosts: [{ url: 'foo.com' }],
    });

    // First, all should be the same, except hosts cache.
    const analytics = client.initAnalytics();
    expect(client.transporter.timeouts).toBe(analytics.transporter.timeouts);
    expect(client.transporter.userAgent).toBe(analytics.transporter.userAgent);
    expect(client.transporter.responsesCache).toBe(analytics.transporter.responsesCache);
    expect(client.transporter.hostsCache).toBe(analytics.transporter.hostsCache);

    // Then, on custom options, only the search client is impacted
    expect(client.transporter.hostsCache).not.toBe(cache);
    expect(customClient.transporter.hostsCache).toBe(cache);
    expect(customClient.initAnalytics().transporter.hostsCache).not.toBe(cache);
    expect(customClient.initAnalytics({ hostsCache: cache }).transporter.hostsCache).toBe(cache);

    expect(client.transporter.requestsCache).not.toBe(cache);
    expect(customClient.transporter.requestsCache).toBe(cache);
    expect(customClient.initPersonalization().transporter.requestsCache).not.toBe(cache);
    expect(customClient.initAnalytics({ requestsCache: cache }).transporter.requestsCache).toBe(
      cache
    );
    expect(customClient.transporter.timeouts).toEqual({
      connect: 45,
      read: 46,
      write: 47,
    });
    expect(customClient.initPersonalization().transporter.timeouts).toEqual({
      connect: testing.isBrowser() ? 1 : 2,
      read: testing.isBrowser() ? 2 : 5,
      write: 30,
    });

    expect(customClient.transporter.queryParameters).toEqual({
      queryParameter: 'bar',
    });
    expect(customClient.transporter.headers).toEqual({
      'content-type': 'application/x-www-form-urlencoded',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
      header: 'foo',
    });
    expect(customClient.transporter.hosts).toEqual([createStatelessHost({ url: 'foo.com' })]);

    expect(customClient.initAnalytics().transporter.queryParameters).toEqual({});
    expect(customClient.initPersonalization().transporter.headers).toEqual({
      'content-type': 'application/json',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });
    expect(customClient.initAnalytics().transporter.hosts).not.toEqual([
      createStatelessHost({ url: 'foo.com' }),
    ]);

    expect(customClient.initPersonalization().transporter.queryParameters).not.toEqual({
      queryParameter: 'bar',
    });

    expect(customClient.initPersonalization().transporter.headers).toEqual({
      'content-type': 'application/json',
      'x-algolia-application-id': 'appId',
      'x-algolia-api-key': 'apiKey',
    });
    expect(customClient.initPersonalization().transporter.hosts).not.toEqual([
      createStatelessHost({ url: 'foo.com' }),
    ]);
  });

  test('shared implementations between clients', () => {
    const analytics = client.initAnalytics();
    const personalization = client.initPersonalization();

    expect(analytics.transporter).not.toBe(client.transporter);
    expect(analytics.transporter.hostsCache).toBe(client.transporter.hostsCache);
    expect(analytics.transporter.userAgent).toBe(client.transporter.userAgent);

    expect(personalization.transporter).not.toBe(client.transporter);
    expect(personalization.transporter.hostsCache).toBe(client.transporter.hostsCache);
    expect(personalization.transporter.userAgent).toBe(client.transporter.userAgent);
  });

  test('allows clients to override credentials', () => {
    const clientWithOptions = algoliasearch('appId', 'apiKey');

    expect(clientWithOptions.transporter.headers['x-algolia-api-key']).toBe('apiKey');

    const analytics = clientWithOptions.initAnalytics({
      apiKey: 'analytics',
    });
    const personalization = clientWithOptions.initPersonalization({
      apiKey: 'personalization',
    });

    expect(analytics.transporter.headers['x-algolia-api-key']).toBe('analytics');
    expect(personalization.transporter.headers['x-algolia-api-key']).toBe('personalization');
  });

  test('allows clients to keep default credentials', () => {
    const clientWithOptions = algoliasearch('appId', 'apiKey');

    expect(clientWithOptions.transporter.headers['x-algolia-api-key']).toBe('apiKey');

    const analytics = clientWithOptions.initAnalytics();
    const personalization = clientWithOptions.initPersonalization();

    expect(analytics.transporter.headers['x-algolia-api-key']).toBe('apiKey');
    expect(personalization.transporter.headers['x-algolia-api-key']).toBe('apiKey');
  });

  it('can be destroyed', () => {
    if (!testing.isBrowser()) {
      expect(client).toHaveProperty('destroy');
    }
  });
});
