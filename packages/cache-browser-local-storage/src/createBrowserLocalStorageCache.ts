import { Cache, CacheEvents } from '@algolia/cache-common';
import { createNullLogger, Logger } from '@algolia/logger-common';

export function createBrowserLocalStorageCache(
  storage: Storage = window.localStorage,
  logger: Logger = createNullLogger()
): Cache {
  /* eslint-disable functional/immutable-data, no-param-reassign, functional/no-try-statement */

  const debugMessage = 'LocalStorage is not available or json could not be decoded.';

  return {
    get<TValue>(
      key: object,
      defaultValue: () => Readonly<Promise<TValue>>,
      events: CacheEvents = {
        miss: () => Promise.resolve(),
      }
    ): Readonly<Promise<TValue>> {
      try {
        const keyAsString = JSON.stringify(key);

        const valueAsString = storage.getItem(keyAsString);

        if (valueAsString !== null) {
          return Promise.resolve(JSON.parse(valueAsString));
        }
      } catch (e) {
        logger.debug(debugMessage);
      }

      const promise = defaultValue();

      return promise.then((value: TValue) => events.miss(value)).then(() => promise);
    },

    set<TValue>(key: object, value: TValue): Readonly<Promise<TValue>> {
      try {
        storage.setItem(JSON.stringify(key), JSON.stringify(value));
      } catch (e) {
        logger.debug(debugMessage);
      }

      return Promise.resolve(value);
    },

    delete(key: object): Readonly<Promise<void>> {
      try {
        storage.removeItem(JSON.stringify(key));
      } catch (e) {
        logger.debug(debugMessage);
      }

      return Promise.resolve();
    },

    clear(): Readonly<Promise<void>> {
      try {
        storage.clear();
      } catch (e) {
        logger.debug(debugMessage);
      }

      return Promise.resolve();
    },
  };
}
