/**
 * The response with a taskID and an updatedAt timestamp.
 */
export type UpdatedAtResponse = {
  /**
   * TaskID of the indexing task to wait for.
   */
  taskID: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
};
