/* eslint no-console: 0 */
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { LogLevelEnum } from '@algolia/client-common';

import { createConsoleLogger } from '../logger';

describe('console logger', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, 'debug');
    vi.spyOn(console, 'info');
    vi.spyOn(console, 'error');
  });

  test('respects log level type debug', async () => {
    const logger = createConsoleLogger(LogLevelEnum.Debug);

    await logger.debug('foo', {});
    await logger.info('foo', {});
    await logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test('respects log level type info', async () => {
    const logger = createConsoleLogger(LogLevelEnum.Info);

    await logger.debug('foo', {});
    await logger.info('foo', {});
    await logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test('respects log level type error', async () => {
    const logger = createConsoleLogger(LogLevelEnum.Error);

    await logger.debug('foo', {});
    await logger.info('foo', {});
    await logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
