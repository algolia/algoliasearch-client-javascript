export type SaveObjectResponse = {
  createdAt?: string;
  /**
   * TaskID of the task to wait for.
   */
  taskID?: number;
  /**
   * Unique identifier of the object.
   */
  objectID?: string;
};
