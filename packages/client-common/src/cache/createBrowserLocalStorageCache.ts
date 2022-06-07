import type { BrowserLocalStorageOptions, Cache, CacheEvents } from '../types';

export function createBrowserLocalStorageCache(
  options: BrowserLocalStorageOptions
): Cache {
  let storage: Storage;
  // We've changed the namespace to avoid conflicts with v4, as this version is a huge breaking change
  const namespaceKey = `algolia-client-js-${options.key}`;

  function getStorage(): Storage {
    if (storage === undefined) {
      storage = options.localStorage || window.localStorage;
    }

    return storage;
  }

  function getNamespace<TValue>(): Record<string, TValue> {
    return JSON.parse(getStorage().getItem(namespaceKey) || '{}');
  }

  return {
    get<TValue>(
      key: Record<string, any> | string,
      defaultValue: () => Promise<TValue>,
      events: CacheEvents<TValue> = {
        miss: (): Promise<void> => Promise.resolve(),
      }
    ): Promise<TValue> {
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

    set<TValue>(
      key: Record<string, any> | string,
      value: TValue
    ): Promise<TValue> {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();

        namespace[JSON.stringify(key)] = value;

        getStorage().setItem(namespaceKey, JSON.stringify(namespace));

        return value;
      });
    },

    delete(key: Record<string, any> | string): Promise<void> {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();

        delete namespace[JSON.stringify(key)];

        getStorage().setItem(namespaceKey, JSON.stringify(namespace));
      });
    },

    clear(): Promise<void> {
      return Promise.resolve().then(() => {
        getStorage().removeItem(namespaceKey);
      });
    },
  };
}
