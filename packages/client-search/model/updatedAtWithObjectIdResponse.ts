// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

/**
 * The response with a taskID, an objectID and an updatedAt timestamp.
 */
export type UpdatedAtWithObjectIdResponse = {
  /**
   * TaskID of the task to wait for.
   */
  taskID?: number;

  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt?: string;

  /**
   * Unique identifier of the object.
   */
  objectID?: string;
};
