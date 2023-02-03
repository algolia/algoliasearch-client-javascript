// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { OnDemandTriggerType } from './onDemandTriggerType';

/**
 * The trigger information of a task of type `on-demand`.
 */
export type OnDemandTrigger = {
  type: OnDemandTriggerType;

  /**
   * The last time the scheduled task ran.
   */
  lastRun?: string;
};
