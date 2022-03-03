export type SaveSynonymResponse = {
  /**
   * TaskID of the task to wait for.
   */
  taskID: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: string;
  /**
   * ObjectID of the inserted object.
   */
  id: string;
};
