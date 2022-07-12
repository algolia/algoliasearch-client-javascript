// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { BatchDictionaryEntriesRequest } from './batchDictionaryEntriesRequest';

/**
 * The `batchDictionaryEntries` parameters.
 */
export type BatchDictionaryEntriesParams = {
  /**
   * When `true`, start the batch by removing all the custom entries from the dictionary.
   */
  clearExistingDictionaryEntries?: boolean;
  /**
   * List of operations to batch. Each operation is described by an `action` and a `body`.
   */
  requests: BatchDictionaryEntriesRequest[];
};
