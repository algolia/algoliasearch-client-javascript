import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import { createNullCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { version } from '@algolia/client-common';

import { createFallbackableCache } from '../../createFallbackableCache';

const notAvailableStorage: Storage = new Proxy(window.localStorage || {}, {
  get() {
    return () => {
      throw new Error('Component is not available');
    };
  },
});

describe('fallbackable cache', () => {
  const key = { 1: 2 };
  const value = { 3: 4 };
  it('always fallback in null cache', async () => {
    const cache = createFallbackableCache({ caches: [] });

    await cache.set(key, value);
    expect(await cache.get(key, () => Promise.resolve({ 5: 6 }))).toEqual({
      5: 6,
    });
  });

  it('uses given caches on the given order', async () => {
    // Should use in memory cache
    {
      const cache = createFallbackableCache({
        caches: [createInMemoryCache()],
      });

      await cache.set(key, value);
      expect(await cache.get(key, () => Promise.resolve({ 5: 6 }))).toEqual({
        3: 4,
      });
    }

    // Should use null cache first
    {
      const cache = createFallbackableCache({
        caches: [createNullCache(), createInMemoryCache()],
      });

      await cache.set(key, value);
      expect(await cache.get(key, () => Promise.resolve({ 5: 6 }))).toEqual({
        5: 6,
      });
    }
  });

  it('fallbacks on given caches', async () => {
    // Should fallback on in memory cache
    {
      const cache = createFallbackableCache({
        caches: [
          createBrowserLocalStorageCache({
            key: version,
            localStorage: {} as any, // this will make the cache fail, and normally we fallback on in memory cache
          }),
          createInMemoryCache(),
        ],
      });

      await cache.set(key, value);
      expect(await cache.get(key, () => Promise.resolve({ 5: 6 }))).toEqual({
        3: 4,
      });
    }

    // Should fallback on null cache
    {
      const cache = createFallbackableCache({
        caches: [
          createBrowserLocalStorageCache({
            key: version,
            localStorage: {} as any, // this will make the cache fail due an type error, and normally we fallback on in memory cache
          }),
        ],
      });

      await cache.set(key, value);
      expect(await cache.get(key, () => Promise.resolve({ 5: 6 }))).toEqual({
        5: 6,
      });
    }

    // Should fallback on in memory cache
    {
      const cache = createFallbackableCache({
        caches: [
          createBrowserLocalStorageCache({
            key: version,
            localStorage: {} as any, // this will make the cache fail due an type error, and normally we fallback on in memory cache
          }),
          createBrowserLocalStorageCache({
            key: version,
            localStorage: notAvailableStorage, // this will make the cache fail due localStorage not available
          }),
          createInMemoryCache(),
        ],
      });

      await cache.set(key, value);
      expect(await cache.get(key, () => Promise.resolve({ 5: 6 }))).toEqual({
        3: 4,
      });

      await cache.clear();
      expect(await cache.get(key, () => Promise.resolve({ 5: 6 }))).toEqual({
        5: 6,
      });
    }
  });
});
