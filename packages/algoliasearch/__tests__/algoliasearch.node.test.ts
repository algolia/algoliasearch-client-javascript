import { test, expect } from 'vitest';

import { algoliasearch, apiClientVersion } from '../builds/node';

const client = algoliasearch('APP_ID', 'API_KEY');

test('sets the ua', () => {
  expect(client.transporter.algoliaAgent).toEqual({
    add: expect.any(Function),
    value: expect.stringContaining(
      `Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion}); Node.js`,
    ),
  });
});

test('forwards node search helpers', () => {
  expect(client.generateSecuredApiKey).not.toBeUndefined();
  expect(client.getSecuredApiKeyRemainingValidity).not.toBeUndefined();
  expect(() => {
    const resp = client.generateSecuredApiKey({ parentApiKey: 'foo', restrictions: { validUntil: 200 } });
    client.getSecuredApiKeyRemainingValidity({ securedApiKey: resp });
  }).not.toThrow();
});
