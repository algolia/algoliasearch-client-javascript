import { RecommendSearchOptions } from '@algolia/recommend';

export type TrendingItemsQuery = {
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
   * The facet attribute to get recommendations for.
   */
  readonly facetName?: string;

  /**
   * The value of the target facet.
   */
  readonly facetValue?: string;
};
