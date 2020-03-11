import { UserIDResponse } from '.';

export type GetTopUserIDsResponse = {
  /**
   * Mapping of cluster names to top users.
   */
  topUsers: Record<string, UserIDResponse[]>;
};
