import type { Cache } from './Cache';

export class MemoryCache implements Cache {
  private cache: Record<string, any> = {};

  async get<TValue>(key: object | string, defaultValue: () => Promise<TValue>): Promise<TValue> {
    const keyAsString = JSON.stringify(key);

    if (keyAsString in this.cache) {
      return Promise.resolve(this.cache[keyAsString]);
    }
    return await defaultValue();
  }

  async set<TValue>(key: object | string, value: TValue): Promise<TValue> {
    this.cache[JSON.stringify(key)] = value;
    return value;
  }

  async delete(key: object | string): Promise<void> {
    delete this.cache[JSON.stringify(key)];
  }

  async clear(): Promise<void> {
    this.cache = {};
  }
}
