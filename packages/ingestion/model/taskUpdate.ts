// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { TriggerInput } from './triggerInput';

/**
 * The payload for a task update.
 */
export type TaskUpdate = {
  /**
   * The destination UUID.
   */
  destinationID?: string;

  trigger?: TriggerInput;

  /**
   * Whether the task is enabled or not.
   */
  enabled?: boolean;
};
