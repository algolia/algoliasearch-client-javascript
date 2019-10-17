/* eslint @typescript-eslint/no-unused-vars: 0 */ // --> OFF
import { Cache, CacheEvents } from './Cache';

export class NullCache implements Cache {
  public get<TValue>(
    key: object,
    defaultValue: () => Readonly<Promise<TValue>>,
    events?: CacheEvents
  ): Readonly<Promise<TValue>> {
    const value = defaultValue();

    const miss = (events && events.miss) || (() => Promise.resolve());

    return miss(value).then(() => value);
  }

  public set<TValue>(key: object, value: TValue): Readonly<Promise<TValue>> {
    return Promise.resolve(value);
  }

  public delete(key: object): Readonly<Promise<void>> {
    return Promise.resolve();
  }

  public clear(): Readonly<Promise<void>> {
    return Promise.resolve();
  }
}
