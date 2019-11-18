import { GetApiKeyResponse } from './GetApiKeyResponse';

export type ListApiKeysResponse = {
  /**
   * List of keys
   */
  readonly keys: readonly GetApiKeyResponse[];
};
