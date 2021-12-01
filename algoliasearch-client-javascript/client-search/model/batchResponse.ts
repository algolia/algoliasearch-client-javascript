export type BatchResponse = {
  /**
   * TaskID of the indexing task to wait for.
   */
  taskID?: number;
  /**
   * List of objectID.
   */
  objectIDs?: string[];
};
