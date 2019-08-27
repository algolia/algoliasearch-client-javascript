/* eslint @typescript-eslint/no-unused-vars: 0 */ // --> OFF
import { Cache, CacheEvents } from './Cache';

export class NullCache implements Cache {
  public get<TValue>(
    key: object,
    defaultValue: Promise<TValue>,
    events: CacheEvents
  ): Promise<TValue> {
    return defaultValue.then((value: TValue) => events.miss(value).then(() => defaultValue));
  }

  public set(key: object, value: any): Promise<void> {
    return Promise.resolve();
  }

  public delete(key: object): Promise<void> {
    return Promise.resolve();
  }

  public clear(): Promise<void> {
    return Promise.resolve();
  }
}
