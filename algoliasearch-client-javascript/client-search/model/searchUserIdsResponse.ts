import type { SearchUserIdsResponseHits } from './searchUserIdsResponseHits';

/**
 * UserIDs data.
 */
export type SearchUserIdsResponse = {
  /**
   * List of user object matching the query.
   */
  hits: SearchUserIdsResponseHits[];
  nbHits: Record<string, any>;
  /**
   * Specify the page to retrieve.
   */
  page: number;
  /**
   * Set the number of hits per page.
   */
  hitsPerPage: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
};
