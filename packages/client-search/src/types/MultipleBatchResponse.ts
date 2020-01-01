export type MultipleBatchResponse = {
  /**
   * The list of object ids.
   */
  readonly objectIDs: readonly string[];

  /**
   * The operation task id. May be used to perform a wait task.
   */
  readonly taskID: { readonly [key: string]: number };
};
