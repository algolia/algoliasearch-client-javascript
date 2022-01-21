/**
 * A task object.
 */
export type Task = {
  /**
   * The id of the task.
   */
  id: string;
  /**
   * The type of the task executed.
   */
  type: TaskType;
};

export type TaskType = 'csv';
