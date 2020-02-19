import { Cache, CacheEvents } from '@algolia/cache-common';

import { BrowserLocalStorageOptions } from '.';

export function createBrowserLocalStorageCache(options: BrowserLocalStorageOptions): Cache {
  const namespaceKey = `algoliasearch-client-js-${options.key}`;

  // eslint-disable-next-line functional/no-let
  let storage: Storage;
  const getStorage = () => {
    if (storage === undefined) {
      storage = options.localStorage || window.localStorage;
    }

    return storage;
  };

  const getNamespace = <TValue>(): Record<string, TValue> => {
    return JSON.parse(getStorage().getItem(namespaceKey) || '{}');
  };

  return {
    get<TValue>(
      key: object | string,
      defaultValue: () => Readonly<Promise<TValue>>,
      events: CacheEvents<TValue> = {
        miss: () => Promise.resolve(),
      }
    ): Readonly<Promise<TValue>> {
      return Promise.resolve()
        .then(() => {
          const keyAsString = JSON.stringify(key);
          const value = getNamespace<TValue>()[keyAsString];

          return Promise.all([value || defaultValue(), value !== undefined]);
        })
        .then(([value, exists]) => {
          return Promise.all([value, exists || events.miss(value)]);
        })
        .then(([value]) => value);
    },

    set<TValue>(key: object | string, value: TValue): Readonly<Promise<TValue>> {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();

        // eslint-disable-next-line functional/immutable-data
        namespace[JSON.stringify(key)] = value;

        getStorage().setItem(namespaceKey, JSON.stringify(namespace));

        return value;
      });
    },

    delete(key: object | string): Readonly<Promise<void>> {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();

        // eslint-disable-next-line functional/immutable-data
        delete namespace[JSON.stringify(key)];

        getStorage().setItem(namespaceKey, JSON.stringify(namespace));
      });
    },

    clear(): Readonly<Promise<void>> {
      return Promise.resolve().then(() => {
        getStorage().removeItem(namespaceKey);
      });
    },
  };
}
