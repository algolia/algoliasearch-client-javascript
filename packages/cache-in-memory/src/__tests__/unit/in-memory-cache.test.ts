import { createInMemoryCache } from '../..';

describe('in memory cache', () => {
  it('sets/gets values', async () => {
    const cache = createInMemoryCache();

    const defaultValue = () => Promise.resolve({ bar: 1 });

    const missMock = jest.fn();

    expect(
      await cache.get({ key: 'foo' }, defaultValue, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchInlineSnapshot(`
      Object {
        "bar": 1,
      }
    `);

    await cache.set({ key: 'foo' }, { foo: 2 });

    expect(missMock.mock.calls.length).toBe(1);

    expect(
      await cache.get({ key: 'foo' }, defaultValue, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({ foo: 2 });

    expect(missMock.mock.calls.length).toBe(1);
  });

  it('getted values do not have references to the value on cache', async () => {
    const cache = createInMemoryCache();

    const key = { foo: 'bar' };
    const obj = { 1: { 2: 'bar' } };
    const defaultObj = { 1: { 2: 'too' } };

    await cache.set(key, obj);
    const gettedValue = await cache.get(key, () => Promise.resolve(defaultObj));
    gettedValue[1][2] = 'foo';

    expect(await cache.get(key, () => Promise.resolve(defaultObj))).toEqual({
      1: { 2: 'bar' },
    });
  });

  it('deletes keys', async () => {
    const cache = createInMemoryCache();
    await cache.set({ key: 'foo' }, { bar: 1 });

    await cache.delete({ key: 'foo' });

    const defaultValue = () => Promise.resolve({ bar: 2 });

    const missMock = jest.fn();

    expect(
      await cache.get({ key: 'foo' }, defaultValue, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({ bar: 2 });

    expect(missMock.mock.calls.length).toBe(1);
  });

  it('can be cleared', async () => {
    const cache = createInMemoryCache();
    await cache.set({ key: 'foo' }, { bar: 1 });

    await cache.clear();

    const defaultValue = () => Promise.resolve({ bar: 2 });

    const missMock = jest.fn();

    expect(
      await cache.get({ key: 'foo' }, defaultValue, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({ bar: 2 });

    expect(missMock.mock.calls.length).toBe(1);
  });

  it('do not force promise based api for clearing cache', async () => {
    const cache = createInMemoryCache();
    cache.set({ key: 'foo' }, { bar: 1 });

    cache.clear();

    const defaultValue = () => Promise.resolve({ bar: 2 });

    const missMock = jest.fn();

    expect(
      await cache.get({ key: 'foo' }, defaultValue, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({ bar: 2 });

    expect(missMock.mock.calls.length).toBe(1);
  });
});
