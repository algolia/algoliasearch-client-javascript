// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { ActionType } from './actionType';
import type { AuthenticationType } from './authenticationType';
import type { AuthenticationUpdate } from './authenticationUpdate';
import type { DestinationType } from './destinationType';
import type { DestinationUpdate } from './destinationUpdate';
import type { EventStatus } from './eventStatus';
import type { EventType } from './eventType';
import type { PlatformWithNone } from './platformWithNone';
import type { RunStatus } from './runStatus';
import type { SourceType } from './sourceType';
import type { SourceUpdate } from './sourceUpdate';
import type { TaskUpdate } from './taskUpdate';
import type { TriggerType } from './triggerType';

/**
 * Properties for the `deleteAuthentication` method.
 */
export type DeleteAuthenticationProps = {
  /**
   * The authentication UUID.
   */
  authenticationID: string;
};

/**
 * Properties for the `deleteDestination` method.
 */
export type DeleteDestinationProps = {
  /**
   * The destination UUID.
   */
  destinationID: string;
};

/**
 * Properties for the `deleteSource` method.
 */
export type DeleteSourceProps = {
  /**
   * The source UUID.
   */
  sourceID: string;
};

/**
 * Properties for the `deleteTask` method.
 */
export type DeleteTaskProps = {
  /**
   * The task UUID.
   */
  taskID: string;
};

/**
 * Properties for the `disableTask` method.
 */
export type DisableTaskProps = {
  /**
   * The task UUID.
   */
  taskID: string;
};

/**
 * Properties for the `enableTask` method.
 */
export type EnableTaskProps = {
  /**
   * The task UUID.
   */
  taskID: string;
};

/**
 * Properties for the `getAuthentication` method.
 */
export type GetAuthenticationProps = {
  /**
   * The authentication UUID.
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
   * The type of the authentications to retrieve.
   */
  type?: AuthenticationType[];
  /**
   * The platform of the authentications to retrieve.
   */
  platform?: PlatformWithNone[];
};

/**
 * Properties for the `getDestination` method.
 */
export type GetDestinationProps = {
  /**
   * The destination UUID.
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
   * The type of the destinations to retrive.
   */
  type?: DestinationType[];
  /**
   * The authenticationIDs of the destinations to retrive.
   */
  authenticationID?: string[];
};

/**
 * Properties for the `getEvent` method.
 */
export type GetEventProps = {
  /**
   * The run UUID.
   */
  runID: string;
  /**
   * The event UUID.
   */
  eventID: string;
};

/**
 * Properties for the `getEvents` method.
 */
export type GetEventsProps = {
  /**
   * The run UUID.
   */
  runID: string;
  /**
   * Filter the status of the events.
   */
  status?: EventStatus[];
  /**
   * Filter the type of the events.
   */
  type?: EventType[];
};

/**
 * Properties for the `getRun` method.
 */
export type GetRunProps = {
  /**
   * The run UUID.
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
  /**
   * Filter the status of the runs.
   */
  status?: RunStatus[];
  /**
   * Filter by taskID.
   */
  taskID?: string;
};

/**
 * Properties for the `getSource` method.
 */
export type GetSourceProps = {
  /**
   * The source UUID.
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
   * The type of the sources to retrieve.
   */
  type?: SourceType[];
  /**
   * The authenticationIDs of the sources to retrieve. \'none\' returns sources that doesn\'t have an authentication.
   */
  authenticationID?: string[];
};

/**
 * Properties for the `getTask` method.
 */
export type GetTaskProps = {
  /**
   * The task UUID.
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
   * The action of the tasks to retrieve.
   */
  action?: ActionType[];
  /**
   * Whether the task is enabled or not.
   */
  enabled?: boolean;
  /**
   * The sourceIDs of the tasks to retrive.
   */
  sourceID?: string[];
  /**
   * The destinationIDs of the tasks to retrive.
   */
  destinationID?: string[];
  /**
   * The trigger type of the task.
   */
  triggerType?: TriggerType[];
};

/**
 * Properties for the `runTask` method.
 */
export type RunTaskProps = {
  /**
   * The task UUID.
   */
  taskID: string;
};

/**
 * Properties for the `updateAuthentication` method.
 */
export type UpdateAuthenticationProps = {
  /**
   * The authentication UUID.
   */
  authenticationID: string;
  authenticationUpdate: AuthenticationUpdate;
};

/**
 * Properties for the `updateDestination` method.
 */
export type UpdateDestinationProps = {
  /**
   * The destination UUID.
   */
  destinationID: string;
  destinationUpdate: DestinationUpdate;
};

/**
 * Properties for the `updateSource` method.
 */
export type UpdateSourceProps = {
  /**
   * The source UUID.
   */
  sourceID: string;
  sourceUpdate: SourceUpdate;
};

/**
 * Properties for the `updateTask` method.
 */
export type UpdateTaskProps = {
  /**
   * The task UUID.
   */
  taskID: string;
  taskUpdate: TaskUpdate;
};
