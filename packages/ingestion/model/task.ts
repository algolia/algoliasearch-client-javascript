// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ActionType } from './actionType';
import type { TaskTrigger } from './taskTrigger';

export type Task = {
  /**
   * The task UUID.
   */
  taskID: string;

  /**
   * The source UUID.
   */
  sourceID: string;

  /**
   * The destination UUID.
   */
  destinationID: string;

  trigger?: TaskTrigger;

  /**
   * Whether the task is enabled or not.
   */
  enabled: boolean;

  action: ActionType;

  /**
   * Date of creation (RFC3339 format).
   */
  createdAt: string;

  /**
   * Date of last update (RFC3339 format).
   */
  updatedAt?: string;
};
