export type SearchUserIDsOptions = {
  /**
   * If specified, only clusters assigned to this cluster can be returned.
   * */
  readonly cluster?: string;

  /**
   * Page to fetch.
   */
  readonly page?: number;

  /**
   * Number of users to return by page.
   */
  readonly hitsPerPage?: number;
};
