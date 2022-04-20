/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-const */
// @ts-nocheck Failing tests will have type errors, but we cannot suppress them even with @ts-expect-error because it doesn't work for a block of lines.
import { recommendClient } from '@experimental-api-clients-automation/recommend';
import { echoRequester } from '@experimental-api-clients-automation/requester-node-http';

const appId = 'test-app-id';
const apiKey = 'test-api-key';

function createClient() {
  return recommendClient(appId, apiKey, { requester: echoRequester() });
}

describe('api', () => {
  test('calls api with correct host', async () => {
    let $client;
    $client = createClient();

    let actual;

    actual = $client.getRecommendations({ requests: [] });

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

    actual = $client.getRecommendations({ requests: [] });

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

    actual = $client.getRecommendations({ requests: [] });

    if (actual instanceof Promise) {
      actual = await actual;
    }

    expect(actual).toEqual(
      expect.objectContaining({ connectTimeout: 2, responseTimeout: 30 })
    );
  });
});
