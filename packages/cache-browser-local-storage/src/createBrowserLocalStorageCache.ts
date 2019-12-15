import { Cache, CacheEvents } from '@algolia/cache-common';

import { BrowserLocalStorageOptions } from '.';

export function createBrowserLocalStorageCache(options: BrowserLocalStorageOptions): Cache {
  /* eslint-disable functional/immutable-data, no-param-reassign, functional/no-try-statement */

  const storage = options.localStorage || window.localStorage;
  const namespaceKey = `algoliasearch-client-js-${options.version}`;

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

    set<TValue>(key: object, value: TValue): Readonly<Promise<TValue>> {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();

        namespace[JSON.stringify(key)] = value;

        storage.setItem(namespaceKey, JSON.stringify(namespace));

        return value;
      });
    },

    delete(key: object): Readonly<Promise<void>> {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();

        delete namespace[JSON.stringify(key)];

        storage.setItem(namespaceKey, JSON.stringify(namespace));
      });
    },
  };
}
