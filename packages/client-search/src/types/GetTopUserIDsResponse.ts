import { UserIDResponse } from '.';

export type GetTopUserIDsResponse = {
  /**
   * Mapping of cluster names to top users.
   */
  readonly topUsers: Readonly<Record<string, readonly UserIDResponse[]>>;
};
