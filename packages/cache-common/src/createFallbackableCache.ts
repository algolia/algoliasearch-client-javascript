import { Cache, CacheEvents, createNullCache } from '.';
import { FallbackableCacheOptions } from './types/FallbackableCacheOptions';

// @todo Add logger on options to debug when caches go wrong.
export function createFallbackableCache(options: FallbackableCacheOptions): Cache {
  const caches = [...options.caches];
  const current = caches.shift(); // eslint-disable-line functional/immutable-data

  if (current === undefined) {
    return createNullCache();
  }

  return {
    get<TValue>(
      key: object | string,
      defaultValue: () => Readonly<Promise<TValue>>,
      events: CacheEvents<TValue> = {
        miss: () => Promise.resolve(),
      }
    ): Readonly<Promise<TValue>> {
      return current.get(key, defaultValue, events).catch(() => {
        return createFallbackableCache({ caches }).get(key, defaultValue, events);
      });
    },

    set<TValue>(key: object | string, value: TValue): Readonly<Promise<TValue>> {
      return current.set(key, value).catch(() => {
        return createFallbackableCache({ caches }).set(key, value);
      });
    },

    delete(key: object | string): Readonly<Promise<void>> {
      return current.delete(key).catch(() => {
        return createFallbackableCache({ caches }).delete(key);
      });
    },

    clear(): Readonly<Promise<void>> {
      return current.clear().catch(() => {
        return createFallbackableCache({ caches }).clear();
      });
    },
  };
}
