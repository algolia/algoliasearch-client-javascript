import { UserIDResponse } from '.';

export type GetTopUserIDsResponse = {
  /**
   * List of users id
   */
  readonly userIDs: readonly UserIDResponse[];
};
