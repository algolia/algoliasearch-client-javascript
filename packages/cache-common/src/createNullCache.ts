import { Cache } from './types/Cache';
import { CacheEvents } from './types/CacheEvents';

export function createNullCache(): Cache {
  return {
    get<TValue>(
      _key: object,
      defaultValue: () => Readonly<Promise<TValue>>,
      events?: CacheEvents
    ): Readonly<Promise<TValue>> {
      const value = defaultValue();

      const miss = (events && events.miss) || (() => Promise.resolve());

      return miss(value).then(() => value);
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
