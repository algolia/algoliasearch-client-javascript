export type HasPendingMappingsOptions = {
  /**
   * If the clusters pending mapping state should be on the response.
   *
   * @default false
   */
  readonly retrieveMappings?: boolean;

  /**
   * If the clusters pending mapping state should be on the response.
   *
   * @default false
   *
   * @internal
   */
  readonly getClusters?: boolean;
};
