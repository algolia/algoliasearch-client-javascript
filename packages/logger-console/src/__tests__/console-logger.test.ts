/* eslint no-console: 0 */

import { LogLevel } from '@algolia/logger-types/src/types/LogLevelType';
import mockConsole from 'jest-mock-console';

import { createConsoleLogger } from '../createConsoleLogger';

describe('console logger', () => {
  beforeEach(() => {
    mockConsole(['debug', 'info', 'error']);
  });

  it('respects log level type debug', () => {
    const logger = createConsoleLogger(LogLevel.Debug);

    logger.debug('foo', {});
    logger.info('foo', {});
    logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('respects log level type info', () => {
    const logger = createConsoleLogger(LogLevel.Info);

    logger.debug('foo', {});
    logger.info('foo', {});
    logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('respects log level type error', () => {
    const logger = createConsoleLogger(LogLevel.Error);

    logger.debug('foo', {});
    logger.info('foo', {});
    logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
