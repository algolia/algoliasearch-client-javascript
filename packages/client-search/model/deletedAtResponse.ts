/**
 * The response with a taskID and a deletedAt timestamp.
 */
export type DeletedAtResponse = {
  /**
   * TaskID of the task to wait for.
   */
  taskID: number;
  /**
   * Date of deletion (ISO-8601 format).
   */
  deletedAt: string;
};
