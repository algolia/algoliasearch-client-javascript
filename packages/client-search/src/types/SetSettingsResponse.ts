export type SetSettingsResponse = {
  /**
   * The operation task id. May be used to perform a wait task.
   */
  readonly taskID: number;

  /**
   * When the settings got updated.
   */
  readonly updatedAt: number;
};
