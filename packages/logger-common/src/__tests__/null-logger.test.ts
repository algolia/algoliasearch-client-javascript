/* eslint no-console: 0 */

import mockConsole from 'jest-mock-console';

import { createNullLogger } from '..';

describe('null logger', () => {
  it('has a null behavior', async () => {
    mockConsole(['debug', 'info', 'error']);

    const logger = createNullLogger();

    await logger.debug('foo', {});
    await logger.info('foo', {});
    await logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(0);
  });
});
