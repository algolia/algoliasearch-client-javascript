export type SaveRulesResponse = {
  /**
   * When the given rules got saved.
   */
  updatedAt: number;

  /**
   * The operation task id. May be used to perform a wait task.
   */
  taskID: number;
};
