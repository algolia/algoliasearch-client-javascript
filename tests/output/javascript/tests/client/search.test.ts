/* eslint-disable @typescript-eslint/no-unused-vars */

// @ts-nocheck
import { SearchApi, EchoRequester } from '@algolia/client-search';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'Algolia-API-Key';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'Algolia-Application-Id';

function createClient(): SearchApi {
  return new SearchApi(appId, apiKey, { requester: new EchoRequester() });
}

describe('basic', () => {
  test('client throws with invalid parameters', async () => {
    let actual;
    await expect(
      new Promise((resolve, reject) => {
        const $client = new SearchApi(
          '',
          'blah',

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
  });
});
