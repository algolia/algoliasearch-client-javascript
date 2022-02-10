import type { SearchParams } from './searchParams';

export type RecommendationRequest = {
  /**
   * The Algolia index name.
   */
  indexName: string;
  /**
   * Unique identifier of the object.
   */
  objectID: string;
  /**
   * The recommendation model to use.
   */
  model: RecommendationRequestModel;
  /**
   * The threshold to use when filtering recommendations by their score.
   */
  threshold: number;
  /**
   * The max number of recommendations to retrieve. If it\'s set to 0, all the recommendations of the objectID may be returned.
   */
  maxRecommendations?: number;
  queryParameters?: SearchParams;
  fallbackParameters?: SearchParams;
};

export type RecommendationRequestModel = 'bought-together' | 'related-products';
