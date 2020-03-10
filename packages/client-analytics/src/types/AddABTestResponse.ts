export type AddABTestResponse = {
  /**
   * The ab test unique identifier.
   */
  abTestID: number;

  /**
   * The operation task id. May be used to perform a wait task.
   */
  taskID: number;

  /**
   * The index name where the ab test is attached to.
   */
  index: string;
};
