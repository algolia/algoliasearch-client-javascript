import { UserIDResponse } from '.';

export type GetTopUserIDsResponse = {
  /**
   * Mapping of cluster names to top users.
   */
  readonly topUsers: { readonly [key: string]: readonly UserIDResponse[] };
};
