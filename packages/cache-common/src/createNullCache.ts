import { Cache, CacheEvents } from '.';

export function createNullCache(): Cache {
  return {
    get<TValue>(
      _key: object,
      defaultValue: () => Readonly<Promise<TValue>>,
      events: CacheEvents<TValue> = {
        miss: () => Promise.resolve(),
      }
    ): Readonly<Promise<TValue>> {
      const value = defaultValue();

      return value
        .then(result => {
          return Promise.all([events.miss(result), result]);
        })
        .then(results => results[1]);
    },

    set<TValue>(_key: object, value: TValue): Readonly<Promise<TValue>> {
      return Promise.resolve(value);
    },

    delete(_key: object): Readonly<Promise<void>> {
      return Promise.resolve();
    },

    clear(): Readonly<Promise<void>> {
      return Promise.resolve();
    },
  };
}
