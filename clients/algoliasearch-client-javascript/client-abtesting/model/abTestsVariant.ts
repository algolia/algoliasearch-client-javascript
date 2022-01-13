export type AbTestsVariant = {
  /**
   * The index performing the A/B test.
   */
  index: string;
  /**
   * The traffic perfecentage for the A/B test.
   */
  trafficPercentage: number;
  /**
   * The A/B test description.
   */
  description?: string;
};
