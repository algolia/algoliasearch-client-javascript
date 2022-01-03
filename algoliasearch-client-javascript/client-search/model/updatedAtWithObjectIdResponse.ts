/**
 * The response with a taskID, an objectID and an updatedAt timestamp.
 */
export type UpdatedAtWithObjectIdResponse = {
  /**
   * TaskID of the indexing task to wait for.
   */
  taskID?: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt?: Date;
  /**
   * Unique identifier of the object.
   */
  objectID?: string;
};
