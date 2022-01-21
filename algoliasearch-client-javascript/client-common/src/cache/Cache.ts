export interface Cache {
  /**
   * Gets the value of the given `key`.
   */
  get: <TValue>(
    key: Record<string, unknown> | string,
    defaultValue: () => Promise<TValue>
  ) => Promise<TValue>;

  /**
   * Sets the given value with the given `key`.
   */
  set: <TValue>(
    key: Record<string, unknown> | string,
    value: TValue
  ) => Promise<TValue>;

  /**
   * Deletes the given `key`.
   */
  delete: (key: Record<string, unknown> | string) => Promise<void>;

  /**
   * Clears the cache.
   */
  clear: () => Promise<void>;
}
