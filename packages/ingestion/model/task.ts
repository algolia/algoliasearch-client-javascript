// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ActionType } from './actionType';
import type { Trigger } from './trigger';

export type Task = {
  taskID: string;

  sourceID: string;

  destinationID: string;

  trigger?: Trigger;

  enabled: boolean;

  action: ActionType;

  lastRun?: string;

  nextRun?: string;

  /**
   * Date of creation (RFC3339 format).
   */
  createdAt: string;

  /**
   * Date of last update (RFC3339 format).
   */
  updatedAt?: string;
};
