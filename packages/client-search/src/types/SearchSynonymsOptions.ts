export type SearchSynonymsOptions = {
  /**
   * The synonym type.
   */
  readonly type?: string;

  /**
   * Page to retrieve.
   */
  readonly page?: number;

  /**
   * Number of hits per page.
   */
  readonly hitsPerPage?: number;
};
