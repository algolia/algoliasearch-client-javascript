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
   * Maximum number of hits in a page. Minimum is 1, maximum is 1000.
   */
  hitsPerPage: number;
  /**
   * Date of last update (ISO-8601 format).
   */
  updatedAt: Date;
};
