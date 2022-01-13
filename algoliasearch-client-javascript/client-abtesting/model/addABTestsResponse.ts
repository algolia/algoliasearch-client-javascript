export type AddABTestsResponse = {
  /**
   * The index performing the A/B test.
   */
  index: string;
  /**
   * The A/B test ID.
   */
  abTestID: number;
  /**
   * TaskID of the task to wait for.
   */
  taskID: number;
};
