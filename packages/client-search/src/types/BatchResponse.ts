export type BatchResponse = {
  /**
   * The operation task id. May be used to perform a wait task.
   */
  readonly taskID: number;

  /**
   * The object ids created/updated by the batch request.
   */
  readonly objectIDs: readonly string[];
};
