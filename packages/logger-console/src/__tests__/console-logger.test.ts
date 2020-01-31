/* eslint no-console: 0 */

import { LogLevelEnum } from '@algolia/logger-common';
import mockConsole from 'jest-mock-console';

import { createConsoleLogger } from '../createConsoleLogger';

describe('console logger', () => {
  beforeEach(() => {
    mockConsole(['debug', 'info', 'error']);
  });

  it('respects log level type debug', async () => {
    const logger = createConsoleLogger(LogLevelEnum.Debug);

    await logger.debug('foo', {});
    await logger.info('foo', {});
    await logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('respects log level type info', async () => {
    const logger = createConsoleLogger(LogLevelEnum.Info);

    await logger.debug('foo', {});
    await logger.info('foo', {});
    await logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('respects log level type error', async () => {
    const logger = createConsoleLogger(LogLevelEnum.Error);

    await logger.debug('foo', {});
    await logger.info('foo', {});
    await logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
