export type ClearAllSynonymsResponse = {
  /**
   * TaskID of the indexing task to wait for.
   */
  taskID: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
};
