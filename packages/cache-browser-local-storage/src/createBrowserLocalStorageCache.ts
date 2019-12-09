import { Cache, CacheEvents } from '@algolia/cache-common';
import { createNullLogger } from '@algolia/logger-common';

import { BrowserLocalStorageOptions } from '.';

export function createBrowserLocalStorageCache(options: BrowserLocalStorageOptions): Cache {
  /* eslint-disable functional/immutable-data, no-param-reassign, functional/no-try-statement */

  const storage = options.storage || window.localStorage;
  const logger = options.logger || createNullLogger();

  const namespaceKey = `algoliasearch-client-js-${options.version}`;
  const debugMessage = 'LocalStorage is not available or json could not be decoded.';

  // eslint-disable-next-line functional/prefer-readonly-type
  const getNamespace = <TValue>(): { [key: string]: TValue } => {
    return JSON.parse(storage.getItem(namespaceKey) || '{}');
  };

  return {
    get<TValue>(
      key: object,
      defaultValue: () => Readonly<Promise<TValue>>,
      events: CacheEvents<TValue> = {
        miss: () => Promise.resolve(),
      }
    ): Readonly<Promise<TValue>> {
      try {
        const keyAsString = JSON.stringify(key);

        const value = getNamespace<TValue>()[keyAsString];

        if (value !== undefined) {
          return Promise.resolve(value);
        }
      } catch (e) {
        logger.debug(debugMessage);
      }

      const promise = defaultValue();

      return promise.then((value: TValue) => events.miss(value)).then(() => promise);
    },

    set<TValue>(key: object, value: TValue): Readonly<Promise<TValue>> {
      try {
        const namespace = getNamespace();

        namespace[JSON.stringify(key)] = value;

        storage.setItem(namespaceKey, JSON.stringify(namespace));
      } catch (e) {
        logger.debug(debugMessage);
      }

      return Promise.resolve(value);
    },

    delete(key: object): Readonly<Promise<void>> {
      try {
        const namespace = getNamespace();

        delete namespace[JSON.stringify(key)];

        storage.setItem(namespaceKey, JSON.stringify(namespace));
      } catch (e) {
        logger.debug(debugMessage);
      }

      return Promise.resolve();
    },

    clear(): Readonly<Promise<void>> {
      try {
        storage.removeItem(namespaceKey);
      } catch (e) {
        logger.debug(debugMessage);
      }

      return Promise.resolve();
    },
  };
}
