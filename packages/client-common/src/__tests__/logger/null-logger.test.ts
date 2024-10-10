import { describe, expect, test, vi } from 'vitest';

import { createNullLogger } from '../../logger';

describe('null logger', () => {
  test('has a null behavior', async () => {
    vi.resetAllMocks();
    vi.spyOn(console, 'debug');
    vi.spyOn(console, 'info');
    vi.spyOn(console, 'error');

    const logger = createNullLogger();

    await logger.debug('foo', {});
    await logger.info('foo', {});
    await logger.error('foo', {});

    expect(console.debug).toHaveBeenCalledTimes(0);
    expect(console.info).toHaveBeenCalledTimes(0);
    expect(console.error).toHaveBeenCalledTimes(0);
  });
});
