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
