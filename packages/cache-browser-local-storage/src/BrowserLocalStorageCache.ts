import { Cache, CacheEvents } from '@algolia/cache-types';

export class BrowserLocalStorageCache implements Cache {
  /* eslint-disable functional/immutable-data, no-param-reassign */

  public get<TValue>(
    key: object,
    defaultValue: () => Promise<TValue>,
    events?: CacheEvents
  ): Promise<TValue> {
    const keyAsString = JSON.stringify(key);

    const valueAsString = localStorage.getItem(keyAsString);

    if (valueAsString !== null) {
      return Promise.resolve(JSON.parse(valueAsString));
    }

    const promise = defaultValue();
    const miss = (events && events.miss) || (() => Promise.resolve());

    return promise.then((value: TValue) => miss(value)).then(() => promise);
  }

  public set<TValue>(key: object, value: TValue): Promise<TValue> {
    localStorage.setItem(JSON.stringify(key), JSON.stringify(value));

    return Promise.resolve(value);
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
