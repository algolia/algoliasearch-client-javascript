export type Cache = {
  /**
   * Gets the value of the given `key`.
   */
  get: <TValue>(
    key: Record<string, any> | string,
    defaultValue: () => Promise<TValue>
  ) => Promise<TValue>;

  /**
   * Sets the given value with the given `key`.
   */
  set: <TValue>(
    key: Record<string, any> | string,
    value: TValue
  ) => Promise<TValue>;

  /**
   * Deletes the given `key`.
   */
  delete: (key: Record<string, any> | string) => Promise<void>;

  /**
   * Clears the cache.
   */
  clear: () => Promise<void>;
};

export function createMemoryCache(): Cache {
  let cache: Record<string, any> = {};

  return {
    async get<TValue>(
      key: Record<string, any> | string,
      defaultValue: () => Promise<TValue>
    ): Promise<TValue> {
      const keyAsString = JSON.stringify(key);

      if (keyAsString in cache) {
        return Promise.resolve(cache[keyAsString]);
      }

      return await defaultValue();
    },

    set<TValue>(
      key: Record<string, any> | string,
      value: TValue
    ): Promise<TValue> {
      cache[JSON.stringify(key)] = value;

      return Promise.resolve(value);
    },

    delete(key: Record<string, unknown> | string): Promise<void> {
      delete cache[JSON.stringify(key)];

      return Promise.resolve();
    },

    clear(): Promise<void> {
      cache = {};

      return Promise.resolve();
    },
  };
}
