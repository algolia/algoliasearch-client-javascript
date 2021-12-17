export type UpdatedRuleResponseWithoutObjectID = {
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
  /**
   * TaskID of the indexing task to wait for.
   */
  taskID: number;
};
