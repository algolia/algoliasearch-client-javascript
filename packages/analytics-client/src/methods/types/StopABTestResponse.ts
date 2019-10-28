export type StopABTestResponse = {
  /**
   * The operation task id. May be used to perform a wait task.
   */
  readonly taskID: number;

  /**
   * The index name where the ab test is attached to.
   */
  readonly index: string;
};
