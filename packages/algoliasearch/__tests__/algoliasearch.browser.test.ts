import { expect, test, vi } from 'vitest';

import { LogLevelEnum } from '../../client-common/src/types';
import { createConsoleLogger } from '../../logger-console/src/logger';
import { algoliasearch, apiClientVersion } from '../builds/browser';

test('sets the ua', () => {
  const client = algoliasearch('APP_ID', 'API_KEY');

  expect(client.transporter.algoliaAgent).toEqual({
    add: expect.any(Function),
    value: expect.stringContaining(
      `Algolia for JavaScript (${apiClientVersion}); Search (${apiClientVersion}); Browser`,
    ),
  });
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
