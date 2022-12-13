// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { EventStatus } from './eventStatus';
import type { EventType } from './eventType';

export type Event = {
  eventID: string;

  runID: string;

  parentID?: string;

  status: EventStatus;

  type: EventType;

  data?: Record<string, any>;

  /**
   * Date of publish (RFC3339 format).
   */
  publishedAt: string;
};
