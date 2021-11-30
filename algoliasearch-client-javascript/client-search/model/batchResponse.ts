export type BatchResponse = {
  /**
   * taskID of the indexing task to wait for.
   */
  taskID?: number;
  /**
   * List of objectID
   */
  objectIDs?: Array<string>;
};
