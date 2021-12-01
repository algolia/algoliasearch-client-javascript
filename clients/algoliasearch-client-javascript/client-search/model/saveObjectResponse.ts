export type SaveObjectResponse = {
  createdAt?: string;
  /**
   * TaskID of the indexing task to wait for.
   */
  taskID?: number;
  /**
   * Unique identifier of the object.
   */
  objectID?: string;
};
