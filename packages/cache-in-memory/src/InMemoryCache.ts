import { Cache } from '@algolia/cache-types';

export class InMemoryCache implements Cache {
  /* eslint-disable functional/immutable-data, no-param-reassign */

  private readonly cache: { readonly [key: string]: string } = {};

  public get<TValue extends object>(key: string, defaultValue: TValue): TValue {
    if (key in this.cache) {
      return JSON.parse(this.cache[key]);
    }

    return defaultValue;
  }
  public set(key: string, value: object): void {
    this.cache[key] = JSON.stringify(value);
  }
  public delete(key: string): void {
    delete this.cache[key];
  }
  public clear(): void {
    this.cache = {};
  }
}
