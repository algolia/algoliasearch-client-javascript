// Code generated by OpenAPI Generator (https://openapi-generator.tech), manual changes will be lost - read more on https://github.com/algolia/api-clients-automation. DO NOT EDIT.

import type { ActionType } from './actionType';
import type { Notifications } from './notifications';
import type { Policies } from './policies';
import type { TaskInput } from './taskInput';

/**
 * API request body for updating a task.
 */
export type TaskUpdate = {
  /**
   * Universally unique identifier (UUID) of a destination resource.
   */
  destinationID?: string | undefined;

  /**
   * Cron expression for the task\'s schedule.
   */
  cron?: string | undefined;

  input?: TaskInput | undefined;

  /**
   * Whether the task is enabled.
   */
  enabled?: boolean | undefined;

  subscriptionAction?: ActionType | undefined;

  /**
   * Maximum accepted percentage of failures for a task run to finish successfully.
   */
  failureThreshold?: number | undefined;

  notifications?: Notifications | undefined;

  policies?: Policies | undefined;
};
