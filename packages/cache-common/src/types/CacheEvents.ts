export type CacheEvents<TValue> = {
  /**
   * The callback when the given `key` is missing from the cache.
   */
  readonly miss: (value: TValue) => Readonly<Promise<any>>;
};
