import type { PostURLJobInput } from './postURLJobInput';

/**
 * Object containing a URL job.
 */
export type PostURLJob = {
  /**
   * The type of the file to ingest.
   */
  type: PostURLJobType;
  input: PostURLJobInput;
};

export type PostURLJobType = 'csv';
