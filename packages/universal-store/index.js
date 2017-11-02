// @flow

type JSONKey = string | number | boolean;
type JSONValue = string | number | boolean | null;
export type Data = {
  [key: JSONKey]: JSONValue | JSONValue[],
};
type Store = { [key: string]: Data };

export type MemoryStore = {
  set: (key: string, data: Data) => Data,
  get: (key: string) => ?Data,
  clear: () => Store,
};
export function createMemoryStore(): MemoryStore {
  let state = {};
  return {
    set(key: string, data: Data): Data {
      state[key] = data;
      return state[key];
    },
    get(key: string): ?Data {
      return state[key];
    },
    clear(): Store {
      state = {};
      return state;
    },
  };
}

function createLocalStorageStore(namespace: string, memoryStore) {
  function localStorageFailure(key: string, e): ?Data {
    // eslint-disable-next-line no-console
    console.warn(e); // debug
    cleanup(namespace);
    return memoryStore.get(key);
  }

  return {
    set(key: string, data: Data): ?Data {
      memoryStore.set(key, data); // always replicate localStorageStore to memoryStore in case of failure

      try {
        const result = JSON.parse(localStorage.getItem(namespace) || '{}');
        result[key] = data;
        localStorage.setItem(namespace, JSON.stringify(result));
        return result[key];
      } catch (e) {
        return localStorageFailure(key, e);
      }
    },
    get(key: string): ?Data {
      try {
        return JSON.parse(localStorage.getItem(namespace) || '{}')[key];
      } catch (e) {
        return localStorageFailure(key, e);
      }
    },
    clear(): Store {
      cleanup(namespace);
      return memoryStore.clear();
    },
  };
}

function supportsLocalStorage(namespace: string) {
  try {
    if (
      ('localStorage' in global || 'localStorage' in window) &&
      localStorage !== null
    ) {
      if (!localStorage.getItem(namespace)) {
        // actual creation of the namespace
        localStorage.setItem(namespace, '{}');
      }

      return true;
    }

    return false;
  } catch (_) {
    return false;
  }
}

// In case of any error on localStorage, we clean our own namespace, this should handle
// quota errors when a lot of keys + data are used
function cleanup(namespace: string) {
  try {
    localStorage.removeItem(namespace);
  } catch (_) {
    // nothing to do
  }
}

export type DataStore = {
  set: (key: string, data: Data) => ?Data,
  get: (key: string) => ?Data,
  clear: () => Store,
  supportsLocalStorage: () => boolean,
};
export default function createStore(namespace: string): DataStore {
  if (typeof namespace !== 'string' || namespace === '') {
    throw new Error(
      `The namespace should be a string, received "${namespace}"`
    );
  }
  const memoryStore = createMemoryStore();
  const store = supportsLocalStorage(namespace)
    ? createLocalStorageStore(namespace, memoryStore)
    : memoryStore;

  return {
    get: (key: string) => store.get(key),
    set: (key: string, data: Data) => store.set(key, data),
    clear: () => store.clear(),
    supportsLocalStorage: () => supportsLocalStorage(namespace),
  };
}
