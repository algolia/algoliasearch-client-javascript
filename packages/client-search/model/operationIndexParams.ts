// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { OperationType } from './operationType';
import type { ScopeType } from './scopeType';

export type OperationIndexParams = {
  operation: OperationType;
  /**
   * The Algolia index name.
   */
  destination: string;
  /**
   * Scope of the data to copy. When absent, a full copy is performed. When present, only the selected scopes are copied.
   */
  scope?: ScopeType[];
};
