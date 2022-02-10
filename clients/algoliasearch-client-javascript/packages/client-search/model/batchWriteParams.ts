import type { Operation } from './operation';

/**
 * The `batch` parameters.
 */
export type BatchWriteParams = {
  requests?: Operation[];
};
