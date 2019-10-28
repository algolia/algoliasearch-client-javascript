export type DeleteABTestResponse = {
  /**
   * The operation task id. May be used to perform a wait task.
   */
  readonly taskID: number;

  /**
   * The index name where the ab test was attached to.
   */
  readonly index: string;
};
