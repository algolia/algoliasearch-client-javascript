import { describe, expect, test } from 'vitest';

import {
  createBrowserLocalStorageCache,
  createFallbackableCache,
  createMemoryCache,
  createNullCache,
} from '../../cache';

const version = 'foobar';
const notAvailableStorage = new Proxy(window.localStorage, {
  get() {
    return (): void => {
      throw new Error('Component is not available');
    };
  },
});

type DefaultValue = Promise<Record<number, number>>;

describe('fallbackable cache', () => {
  const key = { 1: 2 };
  const value = { 3: 4 };
  const defaultValue = (): DefaultValue => Promise.resolve({ 5: 6 });

  test('always fallback in null cache', async () => {
    const cache = createFallbackableCache({ caches: [] });

    await cache.set(key, value);
    expect(await cache.get(key, defaultValue)).toEqual({
      5: 6,
    });
  });

  describe('order', () => {
    test('use memory cache', async () => {
      const cache = createFallbackableCache({
        caches: [createMemoryCache()],
      });

      await cache.set(key, value);

      expect(await cache.get(key, defaultValue)).toEqual({
        3: 4,
      });
    });

    test('use null cache first', async () => {
      const cache = createFallbackableCache({
        caches: [createNullCache(), createMemoryCache()],
      });

      await cache.set(key, value);

      expect(await cache.get(key, defaultValue)).toEqual({
        5: 6,
      });
    });
  });

  test('fallback to to memory cache', async () => {
    const cache = createFallbackableCache({
      caches: [
        createBrowserLocalStorageCache({
          key: version,
          // @ts-expect-error this will make the cache fail, and normally we fallback on memory cache
          localStorage: {},
        }),
        createMemoryCache(),
      ],
    });

    await cache.set(key, value);

    expect(await cache.get(key, defaultValue)).toEqual({
      3: 4,
    });
  });

  test('fallback to null cache', async () => {
    const cache = createFallbackableCache({
      caches: [
        createBrowserLocalStorageCache({
          key: version,
          // @ts-expect-error this will make the cache fail, and normally we fallback on memory cache
          localStorage: {},
        }),
      ],
    });

    await cache.set(key, value);

    expect(await cache.get(key, defaultValue)).toEqual({
      5: 6,
    });
  });

  test('fallback to memory cache', async () => {
    const cache = createFallbackableCache({
      caches: [
        createBrowserLocalStorageCache({
          key: version,
          // @ts-expect-error this will make the cache fail
          localStorage: {},
        }),
        createBrowserLocalStorageCache({
          key: version,
          localStorage: notAvailableStorage, // this will make the cache fail due localStorage not available
        }),
        createMemoryCache(),
      ],
    });

    await cache.set(key, value);

    expect(await cache.get(key, defaultValue)).toEqual({
      3: 4,
    });

    await cache.clear();

    expect(await cache.get(key, defaultValue)).toEqual({
      5: 6,
    });
  });
});
