/* eslint no-console: 0 */

import { LogLevelEnum } from '@algolia/logger-common/types/LogLevelType';
import mockConsole from 'jest-mock-console';

import { createConsoleLogger } from '../createConsoleLogger';

describe('console logger', () => {
  beforeEach(() => {
    mockConsole(['debug', 'info', 'error']);
  });

  it('respects log level type debug', () => {
    const logger = createConsoleLogger(LogLevelEnum.Debug);

    logger.debug('foo', {});
    logger.info('foo', {});
    logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('respects log level type info', () => {
    const logger = createConsoleLogger(LogLevelEnum.Info);

    logger.debug('foo', {});
    logger.info('foo', {});
    logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('respects log level type error', () => {
    const logger = createConsoleLogger(LogLevelEnum.Error);

    logger.debug('foo', {});
    logger.info('foo', {});
    logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
