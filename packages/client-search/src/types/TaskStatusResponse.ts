export type TaskStatusResponse = {
  /**
   * The operation status. When the value is `published` the
   * operation is completed.
   */
  status: string;

  /**
   * If the operation is pending.
   */
  pendingTask: boolean;
};
