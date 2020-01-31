export type SaveSynonymsResponse = {
  /**
   * When the given synonyms got saved.
   */
  readonly updatedAt: number;

  /**
   * The operation task id. May be used to perform a wait task.
   */
  readonly taskID: number;
};
