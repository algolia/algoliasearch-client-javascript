import { describe, expect, test, vi } from 'vitest';

import { createNullLogger, logWarning } from '../../logger';

describe('logWarning', () => {
  test('prefers the logger warn method when implemented', () => {
    vi.resetAllMocks();
    vi.spyOn(console, 'warn');

    const warn = vi.fn().mockResolvedValue(undefined);

    logWarning({ ...createNullLogger(), warn }, 'foo');

    expect(warn).toHaveBeenCalledWith('foo');
    expect(console.warn).toHaveBeenCalledTimes(0);
  });

  test('falls back to console.warn when the logger does not implement warn', () => {
    vi.resetAllMocks();
    vi.spyOn(console, 'warn');

    logWarning(createNullLogger(), 'foo');

    expect(console.warn).toHaveBeenCalledWith('foo');
  });
});
