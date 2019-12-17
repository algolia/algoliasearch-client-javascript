export type BrowserLocalStorageOptions = {
  readonly key: string;
  readonly localStorage?: Storage;
  readonly fallback?: Cache;
};
