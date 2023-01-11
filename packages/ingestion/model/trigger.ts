// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { TriggerType } from './triggerType';

export type Trigger = {
  type: TriggerType;

  cron?: string;

  /**
   * The last time the task ran (`scheduled` or `on-demand`).
   */
  lastRun?: string;

  /**
   * The next scheduled run for the task (`scheduled`).
   */
  nextRun?: string;
};
