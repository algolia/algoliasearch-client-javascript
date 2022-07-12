// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { Action } from './action';

export type BatchOperation = {
  action?: Action;
  /**
   * Arguments to the operation (depends on the type of the operation).
   */
  body?: Record<string, any>;
};
