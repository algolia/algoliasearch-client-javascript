export type UpdatedRuleResponse = {
  /**
   * Unique identifier of the object.
   */
  objectID: string;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
  /**
   * TaskID of the task to wait for.
   */
  taskID: number;
};
