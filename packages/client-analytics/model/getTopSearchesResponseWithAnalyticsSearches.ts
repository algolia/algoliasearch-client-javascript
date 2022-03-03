export type GetTopSearchesResponseWithAnalyticsSearches = {
  /**
   * The search query.
   */
  search: string;
  /**
   * The number of occurrences.
   */
  count: number;
  /**
   * The click-through rate.
   */
  clickThroughRate: number;
  /**
   * The average position of all the click count event.
   */
  averageClickPosition: number;
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
  /**
   * Number of hits that the search query matched.
   */
  nbHits: number;
};
