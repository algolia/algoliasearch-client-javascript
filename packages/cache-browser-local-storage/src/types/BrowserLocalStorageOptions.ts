export type BrowserLocalStorageOptions = {
  /**
   * The cache key.
   */
  readonly key: string;

  /**
   * The time to live for each cached item in seconds.
   */
  readonly timeToLive?: number;

  /**
   * The native local storage implementation.
   */
  readonly localStorage?: Storage;
};
