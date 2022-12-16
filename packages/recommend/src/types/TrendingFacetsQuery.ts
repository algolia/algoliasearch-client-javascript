export type TrendingFacetsQuery = {
  /**
   * The name of the target index.
   */
  readonly indexName: string;

  /**
   * Threshold for the recommendations confidence score (between 0 and 100). Only recommendations with a greater score are returned.
   */
  readonly threshold?: number;

  /**
   * How many recommendations to retrieve.
   */
  readonly maxRecommendations?: number;

  /**
   * Used for trending model
   */
  readonly facetName: string;
};
