// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ActionType } from './actionType';
import type { AuthenticationTypeWithNone } from './authenticationTypeWithNone';
import type { AuthenticationUpdate } from './authenticationUpdate';
import type { DestinationType } from './destinationType';
import type { DestinationUpdate } from './destinationUpdate';
import type { PlatformType } from './platformType';
import type { SourceType } from './sourceType';
import type { SourceUpdate } from './sourceUpdate';
import type { TaskUpdate } from './taskUpdate';
import type { TriggerType } from './triggerType';

/**
 * Properties for the `deleteAuthentication` method.
 */
export type DeleteAuthenticationProps = {
  /**
   * The authentication uuid.
   */
  authenticationID: string;
};

/**
 * Properties for the `deleteDestination` method.
 */
export type DeleteDestinationProps = {
  /**
   * The destination uuid.
   */
  destinationID: string;
};

/**
 * Properties for the `deleteSource` method.
 */
export type DeleteSourceProps = {
  /**
   * The source uuid.
   */
  sourceID: string;
};

/**
 * Properties for the `deleteTask` method.
 */
export type DeleteTaskProps = {
  /**
   * The task uuid.
   */
  taskID: string;
};

/**
 * Properties for the `disableTask` method.
 */
export type DisableTaskProps = {
  /**
   * The task uuid.
   */
  taskID: string;
};

/**
 * Properties for the `enableTask` method.
 */
export type EnableTaskProps = {
  /**
   * The task uuid.
   */
  taskID: string;
};

/**
 * Properties for the `getAuthentication` method.
 */
export type GetAuthenticationProps = {
  /**
   * The authentication uuid.
   */
  authenticationID: string;
};

/**
 * Properties for the `getAuthentications` method.
 */
export type GetAuthenticationsProps = {
  /**
   * The number of items per page to return.
   */
  itemsPerPage?: number;
  /**
   * The page number to fetch, starting at 1.
   */
  page?: number;
  /**
   * Which type the returned authentication should have. Can be a list of string separated with commas.
   */
  type?: AuthenticationTypeWithNone[];
  /**
   * Which platform the returned authentication should have. Can be a list of string separated with commas.
   */
  platform?: PlatformType[];
};

/**
 * Properties for the `getDestination` method.
 */
export type GetDestinationProps = {
  /**
   * The destination uuid.
   */
  destinationID: string;
};

/**
 * Properties for the `getDestinations` method.
 */
export type GetDestinationsProps = {
  /**
   * The number of items per page to return.
   */
  itemsPerPage?: number;
  /**
   * The page number to fetch, starting at 1.
   */
  page?: number;
  /**
   * Which type the returned destination should have. Can be a list of string separated with commas.
   */
  type?: DestinationType[];
  /**
   * Which authenticationID the returned destination should have. Can be a list of string separated with commas.
   */
  authenticationID?: string[];
};

/**
 * Properties for the `getEvent` method.
 */
export type GetEventProps = {
  /**
   * The run uuid.
   */
  runID: string;
  /**
   * The event uuid.
   */
  eventID: string;
};

/**
 * Properties for the `getEvents` method.
 */
export type GetEventsProps = {
  /**
   * The run uuid.
   */
  runID: string;
  /**
   * The number of items per page to return.
   */
  itemsPerPage?: number;
  /**
   * The page number to fetch, starting at 1.
   */
  page?: number;
};

/**
 * Properties for the `getRun` method.
 */
export type GetRunProps = {
  /**
   * The run uuid.
   */
  runID: string;
};

/**
 * Properties for the `getRuns` method.
 */
export type GetRunsProps = {
  /**
   * The number of items per page to return.
   */
  itemsPerPage?: number;
  /**
   * The page number to fetch, starting at 1.
   */
  page?: number;
};

/**
 * Properties for the `getRunsByTaskID` method.
 */
export type GetRunsByTaskIDProps = {
  /**
   * The task uuid.
   */
  taskID: string;
  /**
   * The number of items per page to return.
   */
  itemsPerPage?: number;
  /**
   * The page number to fetch, starting at 1.
   */
  page?: number;
};

/**
 * Properties for the `getSource` method.
 */
export type GetSourceProps = {
  /**
   * The source uuid.
   */
  sourceID: string;
};

/**
 * Properties for the `getSources` method.
 */
export type GetSourcesProps = {
  /**
   * The number of items per page to return.
   */
  itemsPerPage?: number;
  /**
   * The page number to fetch, starting at 1.
   */
  page?: number;
  /**
   * Which type the returned source should have. Can be a list of string separated with commas.
   */
  type?: SourceType[];
  /**
   * Which authenticationID the returned source should have. Can be a list of string separated with commas.
   */
  authenticationID?: string[];
};

/**
 * Properties for the `getTask` method.
 */
export type GetTaskProps = {
  /**
   * The task uuid.
   */
  taskID: string;
};

/**
 * Properties for the `getTasks` method.
 */
export type GetTasksProps = {
  /**
   * The number of items per page to return.
   */
  itemsPerPage?: number;
  /**
   * The page number to fetch, starting at 1.
   */
  page?: number;
  /**
   * Which action the returned task should have. Can be a list of string separated with commas.
   */
  action?: ActionType[];
  /**
   * If the returned task should have its \'enabled\' property set to true.
   */
  enabled?: boolean;
  /**
   * Which destinationID the returned task should have. Can be a list of string separated with commas.
   */
  destinationID?: string[];
  /**
   * Which trigger type the returned task should have. Can be a list of string separated with commas.
   */
  triggerType?: TriggerType[];
};

/**
 * Properties for the `runTask` method.
 */
export type RunTaskProps = {
  /**
   * The task uuid.
   */
  taskID: string;
};

/**
 * Properties for the `updateAuthentication` method.
 */
export type UpdateAuthenticationProps = {
  /**
   * The authentication uuid.
   */
  authenticationID: string;
  authenticationUpdate: AuthenticationUpdate;
};

/**
 * Properties for the `updateDestination` method.
 */
export type UpdateDestinationProps = {
  /**
   * The destination uuid.
   */
  destinationID: string;
  destinationUpdate: DestinationUpdate;
};

/**
 * Properties for the `updateSource` method.
 */
export type UpdateSourceProps = {
  /**
   * The source uuid.
   */
  sourceID: string;
  sourceUpdate: SourceUpdate;
};

/**
 * Properties for the `updateTask` method.
 */
export type UpdateTaskProps = {
  /**
   * The task uuid.
   */
  taskID: string;
  taskUpdate: TaskUpdate;
};
