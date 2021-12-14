export type SaveSynonymResponse = {
  /**
   * TaskID of the indexing task to wait for.
   */
  taskID: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
  /**
   * ObjectID of the inserted object.
   */
  id: string;
};
