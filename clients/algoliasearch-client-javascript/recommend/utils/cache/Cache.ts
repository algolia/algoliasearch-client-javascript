export interface Cache {
  /**
   * Gets the value of the given `key`.
   */
  get: <TValue>(key: object | string, defaultValue: () => Promise<TValue>) => Promise<TValue>;

  /**
   * Sets the given value with the given `key`.
   */
  set: <TValue>(key: object | string, value: TValue) => Promise<TValue>;

  /**
   * Deletes the given `key`.
   */
  delete: (key: object | string) => Promise<void>;

  /**
   * Clears the cache.
   */
  clear: () => Promise<void>;
}
