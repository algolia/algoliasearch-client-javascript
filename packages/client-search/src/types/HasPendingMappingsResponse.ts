export type HasPendingMappingsResponse = {
  /**
   * If there is any clusters with pending mapping state.
   */
  pending: boolean;

  /**
   * Describe cluster pending (migrating, creating, deleting) mapping state.
   */
  clusters?: { [key: string]: string[] };
};
