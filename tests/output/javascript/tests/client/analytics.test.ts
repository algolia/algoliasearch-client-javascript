// @ts-nocheck
import { AnalyticsApi, EchoRequester } from '@algolia/client-analytics';

const appId = process.env.ALGOLIA_APPLICATION_ID || 'Algolia-API-Key';
const apiKey = process.env.ALGOLIA_SEARCH_KEY || 'Algolia-Application-Id';

function createClient(): AnalyticsApi {
  return new AnalyticsApi(appId, apiKey, 'us', {
    requester: new EchoRequester(),
  });
}

describe('basic', () => {
  test('does not throw when region is not given', async () => {
    let actual;

    await expect(
      new Promise((resolve, reject) => {
        const $client = new AnalyticsApi('my-app-id', 'my-api-key', '', {
          requester: new EchoRequester(),
        });
        actual = $client;

        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).resolves.not.toThrow();
  });

  test('getAverageClickPosition throws without index', async () => {
    const $client = createClient();

    let actual;
    await expect(
      new Promise((resolve, reject) => {
        actual = $client.getClickPositions({});
        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow(
      'Parameter `index` is required when calling `getClickPositions`.'
    );
  });
});
