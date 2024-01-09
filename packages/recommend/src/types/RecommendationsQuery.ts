import { RecommendSearchOptions } from './RecommendSearchOptions';

export type RecommendationsQuery = {
  /**
   * The name of the target index.
   */
  readonly indexName: string;

  /**
   * The name of the Recommendation model to use.
   */
  readonly model: 'related-products' | 'bought-together' | 'looking-similar';

  /**
   * The `objectID` of the item to get recommendations for.
   */
  readonly objectID: string;

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
};
