export type BatchResponse = {
  /**
   * TaskID of the task to wait for.
   */
  taskID: number;
  /**
   * List of objectID.
   */
  objectIDs: string[];
};
