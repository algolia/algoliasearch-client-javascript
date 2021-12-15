export type GetTopHitsResponseWithAnalyticsHits = {
  /**
   * The hit.
   */
  hit: string;
  /**
   * The number of occurrences.
   */
  count: number;
  /**
   * The click-through rate.
   */
  clickThroughRate: number;
  /**
   * The conversion rate.
   */
  conversionRate: number;
  /**
   * The number of tracked search click.
   */
  trackedSearchCount: number;
  /**
   * The number of click event.
   */
  clickCount: number;
  /**
   * The number of converted clicks.
   */
  conversionCount: number;
};
