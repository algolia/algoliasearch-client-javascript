export type MultipleBatchResponse = {
  /**
   * List of tasksIDs per index.
   */
  taskID?: Record<string, any>;
  /**
   * List of objectID.
   */
  objectIDs?: string[];
};
