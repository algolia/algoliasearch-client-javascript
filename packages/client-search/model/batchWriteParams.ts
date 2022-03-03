import type { BatchOperation } from './batchOperation';

/**
 * The `batch` parameters.
 */
export type BatchWriteParams = {
  requests?: BatchOperation[];
};
