import type { PostURLJobInput } from './postURLJobInput';
import type { PostURLJobTarget } from './postURLJobTarget';

/**
 * Object containing a URL job.
 */
export type PostURLJob = {
  /**
   * The type of the file to ingest.
   */
  type: PostURLJobType;
  /**
   * The name of the column that hold the unique identifier.
   */
  uniqueIDColumn?: string;
  input: PostURLJobInput;
  target: PostURLJobTarget;
};

export type PostURLJobType = 'csv';
