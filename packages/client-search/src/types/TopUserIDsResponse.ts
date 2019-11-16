import { UserIDResponse } from '.';

export type TopUserIDsResponse = {
  /**
   * List of users id
   */
  readonly userIDs: readonly UserIDResponse[];
};
