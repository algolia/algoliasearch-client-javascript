import type { PostURLJobAuth } from './postURLJobAuth';

/**
 * The input of the job.
 */
export type PostURLJobInput = {
  /**
   * The URL of the file to ingest.
   */
  url: string;
  /**
   * The HTTP method that will be used to fetch the URL.
   */
  method?: PostURLJobInputMethod;
  auth?: PostURLJobAuth;
};

export type PostURLJobInputMethod = 'GET' | 'POST';
