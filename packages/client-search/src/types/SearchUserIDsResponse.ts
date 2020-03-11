import { UserIDResponse } from '.';

export type SearchUserIDsResponse<> = {
  /**
   * List of userID matching the query.
   */
  hits: UserIDResponse[];

  /**
   * Current page.
   */
  page: number;

  /**
   * Number of userIDs matching the query.
   */
  nbHits: number;

  /**
   * Number of hits retrieved per page.
   */
  hitsPerPage: number;

  /**
   * Timestamp of the last update of the index.
   */
  updatedAt: number;
};
