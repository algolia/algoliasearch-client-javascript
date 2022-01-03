import type { Operation } from './operation';

/**
 * The `batch` requests.
 */
export type BatchWriteObject = {
  requests?: Operation[];
};
