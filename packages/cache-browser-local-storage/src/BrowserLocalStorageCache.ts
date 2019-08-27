import { Cache, CacheEvents } from '@algolia/cache-types';

export class BrowserLocalStorageCache implements Cache {
  /* eslint-disable functional/immutable-data, no-param-reassign */

  public get<TValue>(
    key: object,
    defaultValue: Promise<TValue>,
    events: CacheEvents
  ): Promise<TValue> {
    const keyAsString = JSON.stringify(key);

    const valueAsString = localStorage.getItem(keyAsString);

    return valueAsString !== null
      ? Promise.resolve(JSON.parse(valueAsString))
      : defaultValue.then((value: TValue) => events.miss(value).then(() => defaultValue));
  }

  public set(key: object, value: any): Promise<void> {
    localStorage.setItem(JSON.stringify(key), JSON.stringify(value));

    return Promise.resolve();
  }

  public delete(key: object): Promise<void> {
    localStorage.removeItem(JSON.stringify(key));

    return Promise.resolve();
  }

  public clear(): Promise<void> {
    localStorage.clear();

    return Promise.resolve();
  }
}
