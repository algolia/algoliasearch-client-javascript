export type GetPersonalizationStrategyResponse = {
  /**
   * Events scoring
   */
  eventsScoring: Array<{
    eventName: string;
    eventType: string;
    score: number;
  }>;

  /**
   * Facets scoring
   */
  facetsScoring: Array<{
    facetName: string;
    score: number;
  }>;

  /**
   * Personalization impact
   */
  personalizationImpact: number;
};
