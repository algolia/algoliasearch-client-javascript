import { Cache, CacheEvents } from '@algolia/cache-common';

import { InMemoryCacheOptions } from '.';

export function createInMemoryCache(options: InMemoryCacheOptions = { serializable: true }): Cache {
  /* eslint-disable functional/immutable-data, functional/no-let, functional/prefer-readonly-type */
  const cache: { [key: string]: any } = {};

  return {
    get<TValue>(
      key: object,
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

    set<TValue>(key: object, value: TValue): Readonly<Promise<TValue>> {
      cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;

      return Promise.resolve(value);
    },

    delete(key: object): Readonly<Promise<void>> {
      delete cache[JSON.stringify(key)];

      return Promise.resolve();
    },
  };
}
