// @flow

type JSONKey = string | number | boolean;
type JSONValue = string | number | boolean | null;

export type Data = {
  [key: JSONKey]: JSONValue | Data,
};

type State<K, V> = {
  [key: K]: V,
};

export type Store<K, V> = {
  set: (key: K, data: V) => V,
  get: (key: K) => ?V,
  clear: () => State<K, V>,
};

export function createMemoryStore<K, V>(): Store<K, V> {
  let state: State<K, V> = {};

  return {
    set(key: K, data: V): V {
      state[key] = data;
      return state[key];
    },
    get(key: K): ?V {
      return state[key];
    },
    clear(): State<K, V> {
      state = {};
      return state;
    },
  };
}

function createLocalStorageStore<K, V>(
  namespace: string,
  memoryStore: Store<K, V>
): Store<K, V> {
  function localStorageFailure(key: K, data: V, e): void {
    // eslint-disable-next-line no-console
    console.warn(e); // debug
    cleanup(namespace);
  }

  return {
    set(key: K, data: V): V {
      memoryStore.set(key, data); // always replicate localStorageStore to memoryStore in case of failure

      try {
        const result = JSON.parse(localStorage.getItem(namespace) || '{}');
        result[key] = data;
        localStorage.setItem(namespace, JSON.stringify(result));
        return data;
      } catch (e) {
        localStorageFailure(key, e);
        return data;
      }
    },

    get(key: K): ?V {
      try {
        return JSON.parse(localStorage.getItem(namespace) || '{}')[key];
      } catch (e) {
        localStorageFailure(key, e);
        return memoryStore.get(key);
      }
    },

    clear(): State<K, V> {
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

export type DataStore<K, V> = {
  set: (key: K, data: V) => V,
  get: (key: K) => ?V,
  clear: () => State<K, V>,
  supportsLocalStorage: () => boolean,
};

export default function createStore<K, V>(namespace: string): DataStore<K, V> {
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
    get: (key: K) => store.get(key),
    set: (key: K, data: V) => store.set(key, data),
    clear: () => store.clear(),
    supportsLocalStorage: () => supportsLocalStorage(namespace),
  };
}
