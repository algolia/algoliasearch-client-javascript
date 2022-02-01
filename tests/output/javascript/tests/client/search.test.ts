// @ts-nocheck
import { SearchApi, EchoRequester } from '@algolia/client-search';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'Algolia-API-Key';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'Algolia-Application-Id';

function createClient(): SearchApi {
  return new SearchApi(appId, apiKey, { requester: new EchoRequester() });
}

describe('parameters', () => {
  test('constructor throws with invalid parameters', async () => {
    let actual;
    await expect(
      new Promise((resolve, reject) => {
        const $client = new SearchApi(
          '',
          '',

          {
            requester: new EchoRequester(),
          }
        );
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
        const $client = new SearchApi(
          '',
          'my-api-key',

          {
            requester: new EchoRequester(),
          }
        );
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
        const $client = new SearchApi(
          'my-app-id',
          '',

          {
            requester: new EchoRequester(),
          }
        );
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
    const $client = createClient();

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
    const $client = createClient();

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
