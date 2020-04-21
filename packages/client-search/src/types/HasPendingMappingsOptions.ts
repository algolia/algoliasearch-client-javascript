export type HasPendingMappingsOptions = {
  /**
   * If the clusters pending mapping state should be on the response.
   *
   * @defaultValue false
   */
  readonly retrieveMappings?: boolean;

  /**
   * If the clusters pending mapping state should be on the response.
   *
   * @defaultValue false
   *
   * @internal
   */
  readonly getClusters?: boolean;
};
