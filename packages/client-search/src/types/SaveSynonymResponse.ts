export type SaveSynonymResponse = {
  /**
   * When the given synonyms got saved.
   */
  updatedAt: number;

  /**
   * The operation task id. May be used to perform a wait task.
   */
  taskID: number;
};
