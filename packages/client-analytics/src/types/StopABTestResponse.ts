export type StopABTestResponse = {
  /**
   * The ab test unique identifier.
   */
  readonly abTestID: number;

  /**
   * The operation task id. May be used to perform a wait task.
   */
  readonly taskID: number;

  /**
   * The index name where the ab test is attached to.
   */
  readonly index: string;
};
