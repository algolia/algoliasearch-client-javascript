export type BrowseRequestData = {
  /**
   * If available, should be used for browsing to the next page.
   */
  readonly cursor?: string;

  /**
   * If cursor is not available, should be used for browsing to the next page.
   */
  readonly page?: number;
};
