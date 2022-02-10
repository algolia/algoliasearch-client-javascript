export type BrowseRequest = {
  /**
   * Search parameters as URL-encoded query string.
   */
  params?: string;
  /**
   * Cursor indicating the location to resume browsing from. Must match the value returned by the previous call.
   */
  cursor?: string;
};
