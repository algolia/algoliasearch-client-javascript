// @flow

function createModuleStore() {
  const state = {};
  return {
    set(key, data) {
      state[key] = data;
      return state[key];
    },
    get(key) {
      return state[key] || null;
    },
  };
}

function createLocalStorageStore(namespace: string, moduleStore) {
  function localStorageFailure(key, e) {
    // eslint-disable-next-line no-console
    console.warn(e); // debug
    cleanup(namespace);
    return moduleStore.get(key);
  }

  return {
    set(key: string, data: Object) {
      moduleStore.set(key, data); // always replicate localStorageStore to moduleStore in case of failure

      try {
        const result = JSON.parse(localStorage.getItem(namespace) || '{}');
        result[key] = data;
        localStorage.setItem(namespace, JSON.stringify(result));
        return result[key];
      } catch (e) {
        return localStorageFailure(key, e);
      }
    },
    get(key) {
      try {
        return JSON.parse(localStorage.getItem(namespace) || '{}')[key];
      } catch (e) {
        return localStorageFailure(key, e);
      }
    },
  };
}

function supportsLocalStorage(namespace: string) {
  try {
    if ('localStorage' in window && localStorage !== null) {
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

export default function createStore(namespace: string) {
  if (typeof namespace !== 'string' || namespace === '') {
    throw new Error(
      `The namespace should be a string, received "${namespace}"`
    );
  }
  const moduleStore = createModuleStore();
  const store = supportsLocalStorage(namespace)
    ? createLocalStorageStore(namespace, moduleStore)
    : moduleStore;

  return {
    get: (key: string) => store.get(key),
    set: (key: string, data: { [key: string]: any }) => store.set(key, data),
    supportsLocalStorage: () => supportsLocalStorage(namespace),
  };
}
