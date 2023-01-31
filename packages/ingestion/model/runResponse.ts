// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

/**
 * The response from the run task API, containing an Observability Run ID and the time it was created at.
 */
export type RunResponse = {
  /**
   * The run UUID.
   */
  runID: string;

  /**
   * Date of creation (RFC3339 format).
   */
  createdAt: string;
};
