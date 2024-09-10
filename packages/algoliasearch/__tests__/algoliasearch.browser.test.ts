import { test, expect } from 'vitest';

import { algoliasearch, apiClientVersion } from '../builds/browser';

const client = algoliasearch('APP_ID', 'API_KEY');

test('sets the ua', () => {
  expect(client.transporter.algoliaAgent).toEqual({
    add: expect.any(Function),
    value: expect.stringContaining(
      `Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion}); Browser`,
    ),
  });
});
