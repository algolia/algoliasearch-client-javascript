export type BrowserLocalStorageOptions = {
  /**
   * The cache key.
   */
  readonly key: string;

  /**
   * The native local storage implementation.
   */
  readonly localStorage?: Storage;
};
