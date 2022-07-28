// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

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
