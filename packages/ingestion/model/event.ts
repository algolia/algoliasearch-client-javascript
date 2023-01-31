// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { EventStatus } from './eventStatus';
import type { EventType } from './eventType';

/**
 * An event describe a step of the task execution flow..
 */
export type Event = {
  /**
   * The event UUID.
   */
  eventID: string;

  /**
   * The run UUID.
   */
  runID: string;

  /**
   * The parent event, the cause of this event.
   */
  parentID?: string;

  status: EventStatus;

  type: EventType;

  data?: Record<string, any>;

  /**
   * Date of publish (RFC3339 format).
   */
  publishedAt: string;
};
