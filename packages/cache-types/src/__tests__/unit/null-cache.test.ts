import { NullCache } from '../../NullCache';

describe('null cache', () => {
  it('does not set value', async () => {
    const cache = new NullCache();

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
    const cache = new NullCache();

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
});
