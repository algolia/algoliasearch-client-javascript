import type { Cache } from './Cache';

export class MemoryCache implements Cache {
  private cache: Record<string, any> = {};

  async get<TValue>(
    key: Record<string, unknown> | string,
    defaultValue: () => Promise<TValue>
  ): Promise<TValue> {
    const keyAsString = JSON.stringify(key);

    if (keyAsString in this.cache) {
      return Promise.resolve(this.cache[keyAsString]);
    }

    return await defaultValue();
  }

  set<TValue>(
    key: Record<string, unknown> | string,
    value: TValue
  ): Promise<TValue> {
    this.cache[JSON.stringify(key)] = value;

    return Promise.resolve(value);
  }

  delete(key: Record<string, unknown> | string): Promise<void> {
    delete this.cache[JSON.stringify(key)];

    return Promise.resolve();
  }

  clear(): Promise<void> {
    this.cache = {};

    return Promise.resolve();
  }
}
