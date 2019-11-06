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
    ).toMatchSnapshot({ bar: 1 });

    await cache.set({ key: 'foo' }, { foo: 2 });

    expect(missMock.mock.calls.length).toBe(1);

    expect(
      await cache.get({ key: 'foo' }, defaultValue, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({ foo: 2 });

    expect(missMock.mock.calls.length).toBe(1);
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

  it('allows to be clear', async () => {
    const cache = createInMemoryCache();
    await cache.set({ key: 1 }, { 'set-1': 1 });
    await cache.set({ key: 2 }, { 'set-2': 2 });

    await cache.clear();

    const defaultValue1 = () => Promise.resolve({ 'get-1': 1 });
    const defaultValue2 = () => Promise.resolve({ 'get-2': 2 });

    const missMock = jest.fn();

    expect(
      await cache.get({ key: 1 }, defaultValue1, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({ 'get-1': 1 });

    expect(
      await cache.get({ key: 2 }, defaultValue2, {
        miss: () => Promise.resolve(missMock()),
      })
    ).toMatchObject({ 'get-2': 2 });

    expect(missMock.mock.calls.length).toBe(2);
  });
});
