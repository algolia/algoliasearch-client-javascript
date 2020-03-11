export type SaveObjectResponse = {
  /**
   * The operation task id. May be used to perform a wait task.
   */
  taskID: number;

  /**
   * The object id saved.
   */
  objectID: string;
};
