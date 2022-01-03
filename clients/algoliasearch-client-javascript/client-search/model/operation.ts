import type { Action } from './action';

export type Operation = {
  action?: Action;
  /**
   * Arguments to the operation (depends on the type of the operation).
   */
  body?: { [key: string]: Record<string, any> };
  /**
   * Index to target for this operation.
   */
  indexName?: string;
};
