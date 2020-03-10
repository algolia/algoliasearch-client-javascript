export type MultipleBatchResponse = {
  /**
   * The list of object ids.
   */
  objectIDs: string[];

  /**
   * The operation task id. May be used to perform a wait task.
   */
  taskID: Record<string, number>;
};
