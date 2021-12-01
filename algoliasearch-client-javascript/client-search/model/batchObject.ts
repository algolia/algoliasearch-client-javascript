import type { Operation } from './operation';

/**
 * The `batch` requests.
 */
export type BatchObject = {
  requests?: Operation[];
};
