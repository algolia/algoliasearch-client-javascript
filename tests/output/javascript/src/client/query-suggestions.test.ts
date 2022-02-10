/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prefer-const */
// @ts-nocheck Failing tests will have type errors, but we cannot suppress them even with @ts-expect-error because it doesn't work for a block of lines.
import { EchoRequester } from '@algolia/client-common';
import { querySuggestionsApi } from '@algolia/client-query-suggestions';

const appId = 'test-app-id';
const apiKey = 'test-api-key';

function createClient() {
  return querySuggestionsApi(appId, apiKey, 'us', {
    requester: new EchoRequester(),
  });
}

describe('api', () => {
  test('calls api with correct user agent', async () => {
    let $client;
    $client = createClient();

    let actual;

    actual = $client.createConfig({});

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

    actual = $client.createConfig({});

    if (actual instanceof Promise) {
      actual = await actual;
    }

    expect(actual).toEqual(
      expect.objectContaining({ connectTimeout: 2, responseTimeout: 30 })
    );
  });
});

describe('parameters', () => {
  test('throws when region is not given', async () => {
    let $client;

    let actual;
    await expect(
      new Promise((resolve, reject) => {
        $client = querySuggestionsApi('my-app-id', 'my-api-key', '', {
          requester: new EchoRequester(),
        });

        actual = $client;

        if (actual instanceof Promise) {
          actual.then(resolve).catch(reject);
        } else {
          resolve();
        }
      })
    ).rejects.toThrow('`region` is missing.');
  });

  test('does not throw when region is given', async () => {
    let $client;

    let actual;

    await expect(
      new Promise((resolve, reject) => {
        $client = querySuggestionsApi('my-app-id', 'my-api-key', 'us', {
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
});
