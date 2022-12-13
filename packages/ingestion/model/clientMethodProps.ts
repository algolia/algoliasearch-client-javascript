// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AuthenticationUpdate } from './authenticationUpdate';
import type { DestinationUpdate } from './destinationUpdate';
import type { SourceUpdate } from './sourceUpdate';
import type { TaskUpdate } from './taskUpdate';

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
