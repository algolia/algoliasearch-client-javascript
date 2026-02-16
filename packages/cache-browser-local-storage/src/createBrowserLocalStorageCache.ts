import { Cache, CacheEvents } from '@algolia/cache-common';

import { BrowserLocalStorageCacheItem, BrowserLocalStorageOptions } from '.';

function yieldToMain(): Promise<void> {
  // eslint-disable-next-line no-undef
  const g: any = typeof globalThis !== 'undefined' ? globalThis : undefined;

  if (g && g.scheduler && g.scheduler.yield) {
    return g.scheduler.yield();
  }

  return new Promise(resolve => setTimeout(resolve, 0));
}

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

  const getFilteredNamespace = (): Record<string, BrowserLocalStorageCacheItem> => {
    const timeToLive = options.timeToLive ? options.timeToLive * 1000 : null;
    const namespace = getNamespace<BrowserLocalStorageCacheItem>();

    return Object.fromEntries(
      Object.entries(namespace).filter(([, cacheItem]) => {
        if (cacheItem.timestamp === undefined) {
          return false;
        }

        if (!timeToLive) {
          return true;
        }

        return cacheItem.timestamp + timeToLive >= new Date().getTime();
      })
    );
  };

  return {
    get<TValue>(
      key: object | string,
      defaultValue: () => Readonly<Promise<TValue>>,
      events: CacheEvents<TValue> = {
        miss: () => Promise.resolve(),
      }
    ): Readonly<Promise<TValue>> {
      return Promise.resolve().then(async () => {
        await yieldToMain();

        const namespace = getFilteredNamespace();
        const keyAsString = JSON.stringify(key);
        const cachedItem = namespace[keyAsString];

        setNamespace(namespace);

        // eslint-disable-next-line functional/no-let
        let value: TValue;

        if (cachedItem) {
          value = cachedItem.value;
        } else {
          value = await defaultValue();
          await events.miss(value);
        }

        return value;
      });
    },

    set<TValue>(key: object | string, value: TValue): Readonly<Promise<TValue>> {
      return Promise.resolve().then(async () => {
        await yieldToMain();

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
      return Promise.resolve().then(async () => {
        await yieldToMain();

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
