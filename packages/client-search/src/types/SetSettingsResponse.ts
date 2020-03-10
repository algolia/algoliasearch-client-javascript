export type SetSettingsResponse = {
  /**
   * The operation task id. May be used to perform a wait task.
   */
  taskID: number;

  /**
   * When the settings got updated.
   */
  updatedAt: number;
};
