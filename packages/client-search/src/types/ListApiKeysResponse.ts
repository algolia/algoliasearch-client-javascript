import { GetApiKeyResponse } from './GetApiKeyResponse';

export type ListApiKeysResponse = {
  /**
   * List of keys
   */
  keys: GetApiKeyResponse[];
};
