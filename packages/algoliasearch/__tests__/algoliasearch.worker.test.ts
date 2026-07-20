import { expect, test, vi } from 'vitest';

import { LogLevelEnum } from '../../client-common/src/types';
import { createConsoleLogger } from '../../logger-console/src/logger';
import { algoliasearch as node_algoliasearch } from '../builds/node';
import { algoliasearch, apiClientVersion } from '../builds/worker';

test('sets the ua', () => {
  const client = algoliasearch('APP_ID', 'API_KEY');
  expect(client.transporter.algoliaAgent).toEqual({
    add: expect.any(Function),
    value: expect.stringContaining(
      `Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion}); Worker`,
    ),
  });
});

test('forwards node search helpers', () => {
  const client = algoliasearch('APP_ID', 'API_KEY');
  expect(client.generateSecuredApiKey).not.toBeUndefined();
  expect(client.getSecuredApiKeyRemainingValidity).not.toBeUndefined();
  expect(async () => {
    const resp = await client.generateSecuredApiKey({ parentApiKey: 'foo', restrictions: { validUntil: 200 } });
    client.getSecuredApiKeyRemainingValidity({ securedApiKey: resp });
  }).not.toThrow();
});

test('web crypto implementation gives the same result as node crypto', async () => {
  const client = algoliasearch('APP_ID', 'API_KEY');
  const nodeClient = node_algoliasearch('APP_ID', 'API_KEY');
  const resp = await client.generateSecuredApiKey({ parentApiKey: 'foo-bar', restrictions: { validUntil: 200 } });
  const nodeResp = await nodeClient.generateSecuredApiKey({
    parentApiKey: 'foo-bar',
    restrictions: { validUntil: 200 },
  });

  expect(resp).toEqual(nodeResp);
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
