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
