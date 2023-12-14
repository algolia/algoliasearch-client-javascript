import { RecommendModel } from './RecommendModel';
import { RecommendSearchOptions } from './RecommendSearchOptions';

export type RecommendationsQuery = {
  /**
   * The name of the target index.
   */
  readonly indexName: string;

  /**
   * The name of the Recommendation model to use.
   */
  readonly model: RecommendModel;

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

/**
 * Base type for models that don't require an `objectID`.
 *
 * Currently the only model that doesn't require an `objectID` is `recommended-for-you`.
 */
export type RecommendationsQueryWithoutObjectID = Omit<
  RecommendationsQuery,
  'objectID' | 'model'
> & {
  /**
   * The name of the Recommendation model to use.
   */
  readonly model: 'recommended-for-you';
};
