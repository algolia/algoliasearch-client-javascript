import { Cache } from '@algolia/cache-common/src/types/Cache';
import { CacheEvents } from '@algolia/cache-common/src/types/CacheEvents';

export function createInMemoryCache(): Cache {
  /* eslint-disable functional/immutable-data, functional/no-let, functional/prefer-readonly-type */
  let cache: { [key: string]: any } = {};

  return {
    get<TValue>(
      key: object,
      defaultValue: () => Readonly<Promise<TValue>>,
      events?: CacheEvents
    ): Readonly<Promise<TValue>> {
      const keyAsString = JSON.stringify(key);

      if (keyAsString in cache) {
        return Promise.resolve(cache[keyAsString]);
      }

      const promise = defaultValue();
      const miss = (events && events.miss) || (() => Promise.resolve());

      return promise.then((value: TValue) => miss(value)).then(() => promise);
    },

    set<TValue>(key: object, value: TValue): Readonly<Promise<TValue>> {
      cache[JSON.stringify(key)] = value;

      return Promise.resolve(value);
    },

    delete(key: object): Readonly<Promise<void>> {
      delete cache[JSON.stringify(key)];

      return Promise.resolve();
    },

    clear(): Readonly<Promise<void>> {
      cache = {};

      return Promise.resolve();
    },
  };
}
