/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-const */
// @ts-nocheck Failing tests will have type errors, but we cannot suppress them even with @ts-expect-error because it doesn't work for a block of lines.
import { EchoRequester } from '@algolia/client-common';
import { recommendApi } from '@algolia/recommend';

const appId = 'test-app-id';
const apiKey = 'test-api-key';

function createClient() {
  return recommendApi(appId, apiKey, { requester: new EchoRequester() });
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
