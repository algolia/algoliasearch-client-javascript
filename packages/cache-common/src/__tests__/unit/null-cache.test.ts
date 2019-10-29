import { createNullCache } from '../../../';

describe('null cache', () => {
  it('does not set value', async () => {
    const cache = createNullCache();

    await cache.set({ key: 'key' }, { foo: 10 });

    const defaultValue = Promise.resolve({
      foo: 12,
    });

    const missMock = jest.fn();

    expect(
      await cache.get({ key: 'key' }, () => defaultValue, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({
      foo: 12,
    });

    // Always call miss
    expect(missMock.mock.calls.length).toBe(1);
  });

  it('returns default value', async () => {
    const cache = createNullCache();

    const defaultValue = Promise.resolve({
      foo: 12,
    });

    const missMock = jest.fn();

    expect(
      await cache.get({ foo: 'foo' }, () => defaultValue, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({
      foo: 12,
    });

    expect(missMock.mock.calls.length).toBe(1);
  });

  it('resolves a empty promise on clear', async () => {
    const cache = createNullCache();

    const res = await cache.clear();

    expect(res).toBeUndefined();
  });
});
