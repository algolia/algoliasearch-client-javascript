import { expect, test, vi } from 'vitest';

import { LogLevelEnum } from '../../client-common/src/types';
import { createConsoleLogger } from '../../logger-console/src/logger';
import { algoliasearch, apiClientVersion } from '../builds/node';

test('sets the ua', () => {
  const client = algoliasearch('APP_ID', 'API_KEY');
  expect(client.transporter.algoliaAgent).toEqual({
    add: expect.any(Function),
    value: expect.stringContaining(
      `Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion}); Node.js`,
    ),
  });
});

test('forwards node search helpers', () => {
  const client = algoliasearch('APP_ID', 'API_KEY');
  expect(client.generateSecuredApiKey).not.toBeUndefined();
  expect(client.getSecuredApiKeyRemainingValidity).not.toBeUndefined();
  expect(() => {
    const resp = client.generateSecuredApiKey({ parentApiKey: 'foo', restrictions: { validUntil: 200 } });
    client.getSecuredApiKeyRemainingValidity({ securedApiKey: resp });
  }).not.toThrow();
});

test('with logger', async () => {
  const consoleInfo = vi.spyOn(console, 'info').mockImplementation(() => {});

  const client = algoliasearch('APP_ID', 'API_KEY', {
    logger: createConsoleLogger(LogLevelEnum.Debug),
    // every host fails, exercising the retry logging path without a real request that could outlive the test
    requester: {
      send: () => Promise.resolve({ content: 'internal error', isTimedOut: false, status: 500 }),
    },
  });

  await expect(client.setSettings({ indexName: 'foo', indexSettings: {} })).rejects.toThrow();

  expect(consoleInfo).toHaveBeenCalledWith('Retryable failure', expect.any(Object));
});
