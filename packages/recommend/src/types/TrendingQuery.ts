import { TrendingModel } from './RecommendModel';
import { RecommendSearchOptions } from './RecommendSearchOptions';

export type TrendingQuery = {
  /**
   * The name of the target index.
   */
  readonly indexName: string;

  /**
   * The name of the Recommendation model to use.
   */
  readonly model: TrendingModel;

  /**
   * Threshold for the recommendations confidence score (between 0 and 100). Only recommendations with a greater score are returned.
   */
  readonly threshold?: number;

  /**
   * How many recommendations to retrieve.
   */
  readonly maxRecommendations?: number;

  /**
   * List of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/) to send.
   */
  readonly queryParameters?: RecommendSearchOptions;

  /**
   * List of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/) to send.
   *
   * Additional filters to use as fallback when there aren’t enough recommendations.
   */
  readonly fallbackParameters?: RecommendSearchOptions;

  /**
   * Used for trending model
   */
  readonly facetName?: string;

  /**
   * Used for trending model
   */
  readonly facetValue?: string;
};
