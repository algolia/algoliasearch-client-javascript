/**
 * Shared configuration for chunked helpers that poll for task completion.
 */
export type ChunkedHelperOptions = {
  /**
   * The maximum number of retries when polling for task completion. 100 by default.
   */
  maxRetries?: number | undefined;
};
