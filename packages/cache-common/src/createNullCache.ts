import { Cache, CacheEvents } from '.';

export function createNullCache(): Cache {
  return {
    get<TValue>(
      _key: object | string,
      defaultValue: () => Readonly<Promise<TValue>>,
      events: CacheEvents<TValue> = {
        miss: () => Promise.resolve(),
      }
    ): Readonly<Promise<TValue>> {
      const value = defaultValue();

      return value
        .then(result => Promise.all([result, events.miss(result)]))
        .then(([result]) => result);
    },

    set<TValue>(_key: object | string, value: TValue): Readonly<Promise<TValue>> {
      return Promise.resolve(value);
    },

    delete(_key: object | string): Readonly<Promise<void>> {
      return Promise.resolve();
    },

    clear(): Readonly<Promise<void>> {
      return Promise.resolve();
    },
  };
}
