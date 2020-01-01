export type TaskStatusResponse = {
  /**
   * The operation status. When the value is `published` the
   * operation is completed.
   */
  readonly status: string;

  /**
   * If the operation is pending.
   */
  readonly pendingTask: boolean;
};
