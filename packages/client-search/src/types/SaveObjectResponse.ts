export type SaveObjectResponse = {
  /**
   * The operation task id. May be used to perform a wait task.
   */
  readonly taskID: number;

  /**
   * The object id saved.
   */
  readonly objectID: string;
};
