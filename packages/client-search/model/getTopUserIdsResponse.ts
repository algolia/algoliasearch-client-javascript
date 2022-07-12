// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { UserId } from './userId';

/**
 * Array of userIDs and clusters.
 */
export type GetTopUserIdsResponse = {
  /**
   * Mapping of cluster names to top users.
   */
  topUsers: Array<Record<string, UserId[]>>;
};
