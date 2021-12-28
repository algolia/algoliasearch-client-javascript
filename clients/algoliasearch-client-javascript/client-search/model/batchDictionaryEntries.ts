import type { BatchDictionaryEntriesRequest } from './batchDictionaryEntriesRequest';

/**
 * The `batchDictionaryEntries` requests.
 */
export type BatchDictionaryEntries = {
  /**
   * When `true`, start the batch by removing all the custom entries from the dictionary.
   */
  clearExistingDictionaryEntries?: boolean;
  /**
   * List of operations to batch. Each operation is described by an `action` and a `body`.
   */
  requests: BatchDictionaryEntriesRequest[];
};
