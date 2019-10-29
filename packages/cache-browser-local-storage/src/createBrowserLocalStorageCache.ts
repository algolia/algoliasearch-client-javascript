import { Cache } from '@algolia/cache-types/src/types/Cache';
import { CacheEvents } from '@algolia/cache-types/src/types/CacheEvents';

export function createBrowserLocalStorageCache(): Cache {
  /* eslint-disable functional/immutable-data, no-param-reassign */

  return {
    get<TValue>(
      key: object,
      defaultValue: () => Readonly<Promise<TValue>>,
      events?: CacheEvents
    ): Readonly<Promise<TValue>> {
      const keyAsString = JSON.stringify(key);

      const valueAsString = localStorage.getItem(keyAsString);

      if (valueAsString !== null) {
        return Promise.resolve(JSON.parse(valueAsString));
      }

      const promise = defaultValue();
      const miss = (events && events.miss) || (() => Promise.resolve());

      return promise.then((value: TValue) => miss(value)).then(() => promise);
    },

    set<TValue>(key: object, value: TValue): Readonly<Promise<TValue>> {
      localStorage.setItem(JSON.stringify(key), JSON.stringify(value));

      return Promise.resolve(value);
    },

    delete(key: object): Readonly<Promise<void>> {
      localStorage.removeItem(JSON.stringify(key));

      return Promise.resolve();
    },

    clear(): Readonly<Promise<void>> {
      localStorage.clear();

      return Promise.resolve();
    },
  };
}
