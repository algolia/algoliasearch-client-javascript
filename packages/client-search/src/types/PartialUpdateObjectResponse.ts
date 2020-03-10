export type PartialUpdateObjectResponse = {
  /**
   * The operation task id. May be used to perform a wait task.
   */
  taskID: number;

  /**
   * The object id updated.
   */
  objectID: string;
};
