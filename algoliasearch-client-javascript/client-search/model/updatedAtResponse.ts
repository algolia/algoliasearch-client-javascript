/**
 * The response with a taskID and an updatedAt timestamp.
 */
export type UpdatedAtResponse = {
  /**
   * TaskID of the task to wait for.
   */
  taskID: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
};
