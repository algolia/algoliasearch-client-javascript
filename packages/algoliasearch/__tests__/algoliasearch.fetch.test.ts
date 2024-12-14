import { expect, test, vi } from 'vitest';

import { LogLevelEnum } from '../../client-common/src/types';
import { createConsoleLogger } from '../../logger-console/src/logger';
import { algoliasearch, apiClientVersion } from '../builds/fetch';
import { algoliasearch as node_algoliasearch } from '../builds/node';

test('sets the ua', () => {
  const client = algoliasearch('APP_ID', 'API_KEY');
  expect(client.transporter.algoliaAgent).toEqual({
    add: expect.any(Function),
    value: expect.stringContaining(`Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion}); Fetch`),
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

test('with logger', () => {
  vi.spyOn(console, 'debug');
  vi.spyOn(console, 'info');
  vi.spyOn(console, 'error');

  const client = algoliasearch('APP_ID', 'API_KEY', {
    logger: createConsoleLogger(LogLevelEnum.Debug),
  });

  expect(async () => {
    await client.setSettings({ indexName: 'foo', indexSettings: {} });
    expect(console.debug).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  }).not.toThrow();
});
