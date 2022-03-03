export type Variant = {
  /**
   * Average click position for the variant.
   */
  averageClickPosition: number;
  /**
   * Distinct click count for the variant.
   */
  clickCount: number;
  /**
   * Click through rate for the variant.
   */
  clickThroughRate: number;
  /**
   * Distinct conversion count for the variant.
   */
  conversionCount: number;
  /**
   * Conversion rate for the variant.
   */
  conversionRate: number;
  /**
   * The A/B test description.
   */
  description: string;
  /**
   * The index performing the A/B test.
   */
  index: string;
  /**
   * The number of occurrences.
   */
  noResultCount: number;
  /**
   * The number of search during the A/B test.
   */
  searchCount: number;
  /**
   * The number of tracked search click.
   */
  trackedSearchCount: number;
  /**
   * The traffic perfecentage for the A/B test.
   */
  trafficPercentage: number;
  /**
   * The number of user during the A/B test.
   */
  userCount: number;
};
