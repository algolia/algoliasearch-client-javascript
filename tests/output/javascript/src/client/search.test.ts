/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-const */
// @ts-nocheck Failing tests will have type errors, but we cannot suppress them even with @ts-expect-error because it doesn't work for a block of lines.
import { searchApi } from '@algolia/client-search';
import { echoRequester } from '@algolia/requester-node-http';

const appId = 'test-app-id';
const apiKey = 'test-api-key';

function createClient() {
  return searchApi(appId, apiKey, { requester: echoRequester() });
}

describe('api', () => {
  test('calls api with correct host', async () => {
    let $client;
    $client = createClient();

    let actual;

    actual = $client.search({ indexName: 'my-index', searchParams: {} });

    if (actual instanceof Promise) {
      actual = await actual;
    }

    expect(actual).toEqual(
      expect.objectContaining({ host: 'test-app-id.algolia.net' })
    );
  });

  test('calls api with correct user agent', async () => {
    let $client;
    $client = createClient();

    let actual;

    actual = $client.search({ indexName: 'my-index', searchParams: {} });

    if (actual instanceof Promise) {
      actual = await actual;
    }

    expect(actual.userAgent).toMatch(
      /Algolia%20for%20(.+)%20\(\d+\.\d+\.\d+\)/
    );
  });

  test('calls api with correct timeouts', async () => {
    let $client;
    $client = createClient();

    let actual;

    actual = $client.search({ indexName: 'my-index', searchParams: {} });

    if (actual instanceof Promise) {
      actual = await actual;
    }

    expect(actual).toEqual(
      expect.objectContaining({ connectTimeout: 2, responseTimeout: 30 })
    );
  });
});

describe('parameters', () => {
  test('client throws with invalid parameters', async () => {
    let $client;

    let actual;
    await expect(
      new Promise((resolve, reject) => {
        $client = searchApi('', '', { requester: echoRequester() });

        actual = $client;

        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow('`appId` is missing.');

    await expect(
      new Promise((resolve, reject) => {
        $client = searchApi('', 'my-api-key', { requester: echoRequester() });

        actual = $client;

        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow('`appId` is missing.');

    await expect(
      new Promise((resolve, reject) => {
        $client = searchApi('my-app-id', '', { requester: echoRequester() });

        actual = $client;

        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow('`apiKey` is missing.');
  });

  test('`addApiKey` throws with invalid parameters', async () => {
    let $client;
    $client = createClient();

    let actual;
    await expect(
      new Promise((resolve, reject) => {
        actual = $client.addApiKey();
        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow(
      'Parameter `apiKey` is required when calling `addApiKey`.'
    );

    await expect(
      new Promise((resolve, reject) => {
        actual = $client.addApiKey({});
        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow(
      'Parameter `apiKey.acl` is required when calling `addApiKey`.'
    );
  });

  test('`addOrUpdateObject` throws with invalid parameters', async () => {
    let $client;
    $client = createClient();

    let actual;
    await expect(
      new Promise((resolve, reject) => {
        actual = $client.addOrUpdateObject({
          objectID: 'my-object-id',
          body: {},
        });
        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow(
      'Parameter `indexName` is required when calling `addOrUpdateObject`.'
    );

    await expect(
      new Promise((resolve, reject) => {
        actual = $client.addOrUpdateObject({
          indexName: 'my-index-name',
          body: {},
        });
        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow(
      'Parameter `objectID` is required when calling `addOrUpdateObject`.'
    );

    await expect(
      new Promise((resolve, reject) => {
        actual = $client.addOrUpdateObject({
          indexName: 'my-index-name',
          objectID: 'my-object-id',
        });
        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow(
      'Parameter `body` is required when calling `addOrUpdateObject`.'
    );
  });
});
