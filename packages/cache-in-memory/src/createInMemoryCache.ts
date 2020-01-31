import { Cache, CacheEvents } from '@algolia/cache-common';

import { InMemoryCacheOptions } from '.';

export function createInMemoryCache(options: InMemoryCacheOptions = { serializable: true }): Cache {
  // eslint-disable-next-line functional/no-let
  let cache: Record<string, any> = {};

  return {
    get<TValue>(
      key: object | string,
      defaultValue: () => Readonly<Promise<TValue>>,
      events: CacheEvents<TValue> = {
        miss: () => Promise.resolve(),
      }
    ): Readonly<Promise<TValue>> {
      const keyAsString = JSON.stringify(key);

      if (keyAsString in cache) {
        return Promise.resolve(
          options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]
        );
      }

      const promise = defaultValue();
      const miss = (events && events.miss) || (() => Promise.resolve());

      return promise.then((value: TValue) => miss(value)).then(() => promise);
    },

    set<TValue>(key: object | string, value: TValue): Readonly<Promise<TValue>> {
      // eslint-disable-next-line functional/immutable-data
      cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;

      return Promise.resolve(value);
    },

    delete(key: object | string): Readonly<Promise<void>> {
      // eslint-disable-next-line functional/immutable-data
      delete cache[JSON.stringify(key)];

      return Promise.resolve();
    },

    clear(): Readonly<Promise<void>> {
      cache = {};

      return Promise.resolve();
    },
  };
}
