import { createNullCache } from '../..';

describe('null cache', () => {
  const cache = createNullCache();

  it('does not set value', async () => {
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

  it('can be deleted', async () => {
    await cache.delete('foo');
  });

  it('can be cleared', async () => {
    await cache.clear();
  });
});
