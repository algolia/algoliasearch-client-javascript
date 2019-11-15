import { UserIDResponse } from '.';

export type SearchUserIDsResponse<> = {
  /**
   * List of userID matching the query.
   */
  readonly hits: readonly UserIDResponse[];

  /**
   * Current page.
   */
  readonly page: number;

  /**
   * Number of userIDs matching the query.
   */
  readonly nbHits: number;

  /**
   * Number of hits retrieved per page.
   */
  readonly hitsPerPage: number;

  /**
   * Timestamp of the last update of the index.
   */
  readonly updatedAt: number;
};
