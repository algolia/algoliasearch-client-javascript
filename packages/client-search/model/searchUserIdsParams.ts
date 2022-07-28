// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

/**
 * OK.
 */
export type SearchUserIdsParams = {
  /**
   * Query to search. The search is a prefix search with typoTolerance. Use empty query to retrieve all users.
   */
  query: string;

  /**
   * Name of the cluster.
   */
  clusterName?: string;

  /**
   * Specify the page to retrieve.
   */
  page?: number;

  /**
   * Set the number of hits per page.
   */
  hitsPerPage?: number;
};
