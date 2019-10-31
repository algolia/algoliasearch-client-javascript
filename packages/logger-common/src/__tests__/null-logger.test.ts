/* eslint no-console: 0 */

import mockConsole from 'jest-mock-console';

import { createNullLogger } from '../createNullLogger';

describe('null logger', () => {
  it('has a null behavior', () => {
    mockConsole(['debug', 'info', 'error']);

    const logger = createNullLogger();

    logger.debug('foo', {});
    logger.info('foo', {});
    logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(0);
  });
});
