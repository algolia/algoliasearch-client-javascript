export type ChunkedBatchResponse = {
  /**
   * The operations task ids. May be used to perform a wait task.
   */
  readonly taskIDs: readonly number[];

  /**
   * The object ids created/updated/deleted by the multiple requests.
   */
  readonly objectIDs: readonly string[];
};
