import type { Action } from './action';

export type BatchOperation = {
  action?: Action;
  /**
   * Arguments to the operation (depends on the type of the operation).
   */
  body?: Record<string, any>;
};
