import { Logger } from '@algolia/logger-common';

export type BrowserLocalStorageOptions = {
  readonly version: string;
  readonly logger?: Logger;
  readonly storage?: Storage;
};
