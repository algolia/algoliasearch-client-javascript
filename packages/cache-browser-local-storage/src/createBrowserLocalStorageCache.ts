import { Cache, CacheEvents } from '@algolia/cache-common';

import { BrowserLocalStorageCacheItem, BrowserLocalStorageOptions } from '.';

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

  const setNamespace = (namespace: Record<string, any>) => {
    getStorage().setItem(namespaceKey, JSON.stringify(namespace));
  };

  const removeOutdatedCacheItems = () => {
    const timeToLive = options.ttl ? options.ttl * 1000 : null;
    const namespace = getNamespace<BrowserLocalStorageCacheItem>();

    const filteredNamespaceWithoutOldFormattedCacheItems = Object.fromEntries(
      Object.entries(namespace).filter(([, cacheItem]) => {
        return cacheItem.timestamp !== undefined;
      })
    );

    setNamespace(filteredNamespaceWithoutOldFormattedCacheItems);

    if (!timeToLive) {
      return;
    }

    const filteredNamespaceWithoutExpiredItems = Object.fromEntries(
      Object.entries(filteredNamespaceWithoutOldFormattedCacheItems).filter(([, cacheItem]) => {
        const currentTimestamp = new Date().getTime();
        const isExpired = cacheItem.timestamp + timeToLive < currentTimestamp;

        return !isExpired;
      })
    );

    setNamespace(filteredNamespaceWithoutExpiredItems);
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
          removeOutdatedCacheItems();

          const keyAsString = JSON.stringify(key);

          return getNamespace<Promise<BrowserLocalStorageCacheItem>>()[keyAsString];
        })
        .then(value => {
          return Promise.all([value ? value.value : defaultValue(), value !== undefined]);
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
        namespace[JSON.stringify(key)] = {
          timestamp: new Date().getTime(),
          value,
        };

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
