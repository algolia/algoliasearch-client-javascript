import { describe, expect, test } from 'vitest';

import {
  DEFAULT_CONNECT_TIMEOUT_BROWSER,
  DEFAULT_READ_TIMEOUT_BROWSER,
  DEFAULT_WRITE_TIMEOUT_BROWSER,
} from '@algolia/client-common';
import type { EchoResponse } from '@algolia/requester-testing';

import { browserEchoRequester } from '../../requester-testing/src/browserEchoRequester';
import { algoliasearch, apiClientVersion } from '../builds/browser';
import { liteClient } from '../lite/builds/browser';

const client = algoliasearch('APP_ID', 'API_KEY', {
  requester: browserEchoRequester(),
});

describe('api', () => {
  test('exposes the `appId` currently in use at the root of the API', () => {
    expect(client.appId).toEqual('APP_ID');
  });

  test('exposes the `apiKey` currently in use at the root of the API', () => {
    expect(client.apiKey).toEqual('API_KEY');
  });

  test('provides a `clearCache` method', () => {
    expect(client.clearCache).not.toBeUndefined();
    expect(() => client.clearCache()).not.toThrow();
  });

  test('provides a `setClientApiKey` method', () => {
    const _client = algoliasearch('foo', 'bar');
    expect(_client.transporter.baseQueryParameters['x-algolia-api-key']).toEqual('bar');
    expect(_client.setClientApiKey).not.toBeUndefined();
    _client.setClientApiKey({ apiKey: 'tabac' });
    expect(_client.transporter.baseQueryParameters['x-algolia-api-key']).toEqual('tabac');
  });

  test('throws with undefined API key', () => {
    expect(() => algoliasearch('APP_ID', '')).toThrow('`apiKey` is missing');
  });

  test('throws with undefined app ID', () => {
    expect(() => algoliasearch('', 'API_KEY')).toThrow('`appId` is missing');
  });

  test('provides the search client at the root of the API', () => {
    expect(client.search).not.toBeUndefined();
  });

  describe('_ua', () => {
    test('provides a backward compatible `_ua` variable at the root of the client', () => {
      expect(client._ua).toEqual(
        expect.stringContaining(`Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion});`),
      );
    });

    test('keeps `_ua` updated with the transporter algolia agent', () => {
      expect(client._ua).toEqual(expect.stringMatching(/.*; Browser$/g));

      client.addAlgoliaAgent('Vitest', '0.0.1');

      expect(client._ua).toEqual(expect.stringMatching(/.*; Vitest \(0\.0\.1\)$/g));
    });
  });

  test('exposes the search client transporter for the algoliasearch client', () => {
    expect(client.transporter).not.toBeUndefined();
    expect(client.transporter).toEqual({
      algoliaAgent: {
        add: expect.any(Function),
        value: expect.stringContaining(
          `Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion}); Browser`,
        ),
      },
      baseQueryParameters: {
        'x-algolia-api-key': 'API_KEY',
        'x-algolia-application-id': 'APP_ID',
      },
      baseHeaders: {
        'content-type': 'text/plain',
      },
      hosts: expect.arrayContaining([
        {
          accept: 'read',
          protocol: 'https',
          url: 'APP_ID-dsn.algolia.net',
        },
        {
          accept: 'write',
          protocol: 'https',
          url: 'APP_ID.algolia.net',
        },
        {
          accept: 'readWrite',
          protocol: 'https',
          url: 'APP_ID-3.algolianet.com',
        },
        {
          accept: 'readWrite',
          protocol: 'https',
          url: 'APP_ID-1.algolianet.com',
        },
        {
          accept: 'readWrite',
          protocol: 'https',
          url: 'APP_ID-2.algolianet.com',
        },
      ]),
      logger: {
        debug: expect.any(Function),
        error: expect.any(Function),
        info: expect.any(Function),
      },
      hostsCache: {
        clear: expect.any(Function),
        delete: expect.any(Function),
        get: expect.any(Function),
        set: expect.any(Function),
      },
      request: expect.any(Function),
      requester: {
        send: expect.any(Function),
      },
      requestsCache: {
        clear: expect.any(Function),
        delete: expect.any(Function),
        get: expect.any(Function),
        set: expect.any(Function),
      },
      responsesCache: {
        clear: expect.any(Function),
        delete: expect.any(Function),
        get: expect.any(Function),
        set: expect.any(Function),
      },
      timeouts: {
        connect: DEFAULT_CONNECT_TIMEOUT_BROWSER,
        read: DEFAULT_READ_TIMEOUT_BROWSER,
        write: DEFAULT_WRITE_TIMEOUT_BROWSER,
      },
    });
  });

  describe('bridge methods', () => {
    test('throws when missing transformation.region', () => {
      //@ts-expect-error
      expect(() => algoliasearch('APP_ID', 'API_KEY', { transformation: {} })).toThrow(
        '`region` must be provided when leveraging the transformation pipeline',
      );
    });

    test('throws when calling the transformation methods without init parameters', async () => {
      await expect(
        client.saveObjectsWithTransformation({
          indexName: 'foo',
          objects: [{ objectID: 'bar', baz: 42 }],
          waitForTasks: true,
        }),
      ).rejects.toThrow('`transformation.region` must be provided at client instantiation before calling this method.');

      await expect(
        client.partialUpdateObjectsWithTransformation({
          indexName: 'foo',
          objects: [{ objectID: 'bar', baz: 42 }],
          waitForTasks: true,
        }),
      ).rejects.toThrow('`transformation.region` must be provided at client instantiation before calling this method.');
    });
  });
});

describe('bundle', () => {
  test('expose both a full bundled package and a lite one', () => {
    expect(liteClient).not.toBeUndefined();
    expect(algoliasearch).not.toBeUndefined();
  });
});

/**
 * We only test the legacy signature, as `algoliasearch` inherits methods from the `client-search`.
 * The new signatures are already tested in the CTS.
 */
describe('search with legacy signature', () => {
  test('allows searching for query', async () => {
    const req = (await client.search([
      {
        indexName: 'theIndexName',
      },
    ])) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/queries');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({ requests: [{ indexName: 'theIndexName' }] });
    expect(req.searchParams).toStrictEqual({
      'x-algolia-api-key': 'API_KEY',
      'x-algolia-application-id': 'APP_ID',
    });
  });

  test('allows searching for facet', async () => {
    const req = (await client.search([
      {
        indexName: 'theIndexName',
        type: 'facet',
        facet: 'theFacet',
      },
    ])) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/queries');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [{ indexName: 'theIndexName', type: 'facet', facet: 'theFacet' }],
    });
    expect(req.searchParams).toStrictEqual({
      'x-algolia-api-key': 'API_KEY',
      'x-algolia-application-id': 'APP_ID',
    });
  });

  test('accepts a `params` parameter for `searchParams`', async () => {
    const req = (await client.search([
      {
        indexName: 'theIndexName',
        params: {
          hitsPerPage: 42,
        },
      },
    ])) as unknown as EchoResponse;

    expect(req.path).toEqual('/1/indexes/*/queries');
    expect(req.method).toEqual('POST');
    expect(req.data).toEqual({
      requests: [{ indexName: 'theIndexName', hitsPerPage: 42 }],
    });
    expect(req.searchParams).toStrictEqual({
      'x-algolia-api-key': 'API_KEY',
      'x-algolia-application-id': 'APP_ID',
    });
  });
});

describe('init', () => {
  test('sets authMode', async () => {
    const qpClient = algoliasearch('foo', 'bar', {
      authMode: 'WithinQueryParameters',
      requester: browserEchoRequester(),
    });
    const headerClient = algoliasearch('foo', 'bar', {
      authMode: 'WithinHeaders',
      requester: browserEchoRequester(),
    });

    const qpResult = (await qpClient.customGet({
      path: '1/foo',
    })) as unknown as EchoResponse;
    expect(qpResult.searchParams).toEqual({
      'x-algolia-api-key': 'bar',
      'x-algolia-application-id': 'foo',
    });

    const headerResult = (await headerClient.customGet({
      path: '1/bar',
    })) as unknown as EchoResponse;
    expect(headerResult.headers).toEqual({
      accept: 'application/json',
      'content-type': 'text/plain',
      'x-algolia-api-key': 'bar',
      'x-algolia-application-id': 'foo',
    });
  });

  test('defaults to qp', async () => {
    const res = (await client.customGet({
      path: '1/foo',
    })) as unknown as EchoResponse;
    expect(res.searchParams).toEqual({
      'x-algolia-api-key': 'API_KEY',
      'x-algolia-application-id': 'APP_ID',
    });
  });
});
