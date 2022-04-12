import type { Method } from './method';
import type { PostURLJobAuth } from './postURLJobAuth';

/**
 * The input of the job.
 */
export type PostURLJobInput = {
  /**
   * The URL of the file to ingest.
   */
  url: string;
  method?: Method;
  auth?: PostURLJobAuth;
};
