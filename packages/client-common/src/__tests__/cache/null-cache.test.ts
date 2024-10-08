import { beforeEach, describe, expect, test, vi } from 'vitest';

import { createNullCache } from '../../cache';

type DefaultValue = Promise<{ bar: number }>;

describe('null cache', () => {
  const cache = createNullCache();
  const missMock = vi.fn();
  const events = {
    miss: (): Promise<any> => Promise.resolve(missMock()),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('does not set value', async () => {
    const defaultValue = (): DefaultValue => Promise.resolve({ bar: 12 });

    await cache.set({ key: 'key' }, { foo: 10 });

    expect(await cache.get({ key: 'key' }, defaultValue, events)).toMatchObject({
      bar: 12,
    });

    expect(missMock.mock.calls.length).toBe(1);
  });

  test('returns default value', async () => {
    const defaultValue = (): DefaultValue => Promise.resolve({ bar: 12 });

    expect(await cache.get({ foo: 'foo' }, defaultValue, events)).toMatchObject({
      bar: 12,
    });

    expect(missMock.mock.calls.length).toBe(1);
  });

  test('can be deleted', () => {
    expect(async () => await cache.delete('foo')).not.toThrowError();
  });

  test('can be cleared', () => {
    expect(async () => await cache.clear()).not.toThrowError();
  });
});
