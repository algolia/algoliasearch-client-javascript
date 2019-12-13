export type BrowserLocalStorageOptions = {
  readonly version: string;
  readonly localStorage?: Storage;
  readonly fallback?: Cache;
};
