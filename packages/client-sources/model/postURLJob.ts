// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { PostURLJobInput } from './postURLJobInput';
import type { PostURLJobTarget } from './postURLJobTarget';
import type { TaskType } from './taskType';

/**
 * Object containing a URL job.
 */
export type PostURLJob = {
  type: TaskType;
  /**
   * The name of the column that hold the unique identifier.
   */
  uniqueIDColumn?: string;
  input: PostURLJobInput;
  target: PostURLJobTarget;
};
