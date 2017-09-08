// @flow

function createModuleStore() {
  return {
    state: {},
    set(key, data) {
      this.state[key] = data;
      return this.state[key];
    },
    get(key) {
      return this.state[key] || null;
    },
  };
}

function createSessionStorageStore(namespace: string, moduleStore) {
  function sessionStorageFailure(key, e) {
    // eslint-disable-next-line no-console
    console.warn(e); // debug
    cleanup(namespace);
    return moduleStore.get(key);
  }

  return {
    set(key: string, data: Object) {
      moduleStore.set(key, data); // always replicate sessionStorageStore to moduleStore in case of failure

      try {
        const result = JSON.parse(sessionStorage.getItem(namespace) || '{}');
        result[key] = data;
        sessionStorage.setItem(namespace, JSON.stringify(result));
        return result[key];
      } catch (e) {
        return sessionStorageFailure(key, e);
      }
    },
    get(key) {
      try {
        return JSON.parse(sessionStorage.getItem(namespace) || '{}')[key];
      } catch (e) {
        return sessionStorageFailure(key, e);
      }
    },
  };
}

function supportsSessionStorage(namespace: string) {
  try {
    if ('sessionStorage' in window && sessionStorage !== null) {
      if (!sessionStorage.getItem(namespace)) {
        // actual creation of the namespace
        sessionStorage.setItem(namespace, '{}');
      }
      return true;
    }

    return false;
  } catch (_) {
    return false;
  }
}

// In case of any error on sessionStorage, we clean our own namespace, this should handle
// quota errors when a lot of keys + data are used
function cleanup(namespace: string) {
  try {
    sessionStorage.removeItem(namespace);
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
  const store = supportsSessionStorage(namespace)
    ? createSessionStorageStore(namespace, moduleStore)
    : moduleStore;

  return {
    get: (key: string) => store.get(key),
    set: (key: string, data: { [key: string]: any }) => store.set(key, data),
    supportsSessionStorage: () => supportsSessionStorage(namespace),
  };
}
