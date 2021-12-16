export type DeleteIndexResponse = {
  /**
   * TaskID of the indexing task to wait for.
   */
  taskID?: number;
  /**
   * Date of deletion (ISO-8601 format).
   */
  deletedAt?: Date;
};
