/* eslint @typescript-eslint/no-unused-vars: 0 */ // --> OFF
import { Cache, CacheEvents } from './..';

export function createNullCache(): Cache {
  return {
    get<TValue>(
      key: object,
      defaultValue: () => Readonly<Promise<TValue>>,
      events?: CacheEvents
    ): Readonly<Promise<TValue>> {
      const value = defaultValue();

      const miss = (events && events.miss) || (() => Promise.resolve());

      return miss(value).then(() => value);
    },

    set<TValue>(key: object, value: TValue): Readonly<Promise<TValue>> {
      return Promise.resolve(value);
    },

    delete(key: object): Readonly<Promise<void>> {
      return Promise.resolve();
    },

    clear(): Readonly<Promise<void>> {
      return Promise.resolve();
    },
  };
}
