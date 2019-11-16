import { UserIDResponse } from '.';

export type ListUserIDsResponse = {
  /**
   * List of users id
   */
  readonly userIDs: readonly UserIDResponse[];
};
