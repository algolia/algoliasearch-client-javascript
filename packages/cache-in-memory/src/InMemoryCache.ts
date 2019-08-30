import { Cache } from '@algolia/cache-types';
import { CacheEvents } from '../../cache-types/src';

export class InMemoryCache implements Cache {
  /* eslint-disable functional/immutable-data, no-param-reassign */
  private cache: { [key: string]: any } = {}; // eslint-disable-line functional/prefer-readonly-type

  public get<TValue>(
    key: object,
    defaultValue: () => Promise<TValue>,
    events: CacheEvents
  ): Promise<TValue> {
    const keyAsString = this.objectToString(key);

    if (keyAsString in this.cache) {
      return Promise.resolve(this.cache[keyAsString]);
    }

    const promise = defaultValue();

    return promise.then((value: TValue) => events.miss(value)).then(() => promise);
  }

  public set(key: object, value: any): Promise<void> {
    this.cache[this.objectToString(key)] = value;

    return Promise.resolve();
  }

  public delete(key: object): Promise<void> {
    delete this.cache[this.objectToString(key)];

    return Promise.resolve();
  }

  public clear(): Promise<void> {
    this.cache = {};

    return Promise.resolve();
  }

  private objectToString(value: object): string {
    return JSON.stringify(value);
  }
}
