export type HasPendingMappingsResponse = {
  /**
   * If there is any clusters with pending mapping state.
   */
  readonly pending: boolean;

  /**
   * Describe cluster pending (migrating, creating, deleting) mapping state.
   */
  readonly clusters?: { readonly [key: string]: readonly string[] };
};
