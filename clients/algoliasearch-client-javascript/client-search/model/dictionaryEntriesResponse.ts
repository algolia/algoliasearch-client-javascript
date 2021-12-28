/**
 * The dictionary entry reponse.
 */
export type DictionaryEntriesResponse = {
  /**
   * TaskID of the indexing task to wait for.
   */
  taskId: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
};
