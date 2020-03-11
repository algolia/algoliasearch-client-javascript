export type ChunkedBatchResponse = {
  /**
   * The operations task ids. May be used to perform a wait task.
   */
  taskIDs: number[];

  /**
   * The object ids created/updated/deleted by the multiple requests.
   */
  objectIDs: string[];
};
