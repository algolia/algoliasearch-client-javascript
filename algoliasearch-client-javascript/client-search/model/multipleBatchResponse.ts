export type MultipleBatchResponse = {
  /**
   * List of tasksIDs per index.
   */
  taskID?: { [key: string]: Record<string, any> };
  /**
   * List of objectID.
   */
  objectIDs?: string[];
};
