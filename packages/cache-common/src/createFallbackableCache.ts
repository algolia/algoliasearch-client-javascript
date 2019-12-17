import { Cache, CacheEvents, createNullCache } from '.';
import { FallbackableCacheOptions } from './types/FallbackableCacheOptions';

// @todo Add logger on options to debug when caches go wrong.
export function createFallbackableCache(options: FallbackableCacheOptions): Cache {
  const caches = [...options.caches];
  // eslint-disable-next-line functional/immutable-data
  const current = caches.shift();

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
  };
}
