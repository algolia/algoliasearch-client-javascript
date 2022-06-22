export type BaseBrowseResponse = {
  /**
   * Cursor indicating the location to resume browsing from. Must match the value returned by the previous call.
   */
  cursor: string;
};
