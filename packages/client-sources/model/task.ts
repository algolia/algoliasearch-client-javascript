import type { TaskType } from './taskType';

/**
 * A task object.
 */
export type Task = {
  /**
   * The id of the task.
   */
  id: string;
  type: TaskType;
};
