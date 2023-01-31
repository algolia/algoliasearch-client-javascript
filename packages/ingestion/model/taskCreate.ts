// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ActionType } from './actionType';
import type { TaskCreateTrigger } from './taskCreateTrigger';

/**
 * The payload for a task creation.
 */
export type TaskCreate = {
  /**
   * The source UUID.
   */
  sourceID: string;

  /**
   * The destination UUID.
   */
  destinationID: string;

  trigger: TaskCreateTrigger;

  action: ActionType;

  /**
   * Whether the task is enabled or not.
   */
  enabled?: boolean;
};
