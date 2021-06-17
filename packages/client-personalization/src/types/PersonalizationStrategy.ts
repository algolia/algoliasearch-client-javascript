export type PersonalizationStrategy = {
  /**
   * Events scoring
   */
  readonly eventsScoring: ReadonlyArray<{
    readonly eventName: string;
    readonly eventType: string;
    readonly score: number;
  }>;

  /**
   * Facets scoring
   */
  readonly facetsScoring: ReadonlyArray<{
    readonly facetName: string;
    readonly score: number;
  }>;

  /**
   * Personalization impact
   */
  readonly personalizationImpact: number;
};
