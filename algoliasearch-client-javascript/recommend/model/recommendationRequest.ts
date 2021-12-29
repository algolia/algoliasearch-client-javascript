import type { BaseSearchParams } from './baseSearchParams';
import type { IndexSettingsAsSearchParams } from './indexSettingsAsSearchParams';

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
  model: RecommendationRequest.ModelEnum;
  /**
   * The threshold to use when filtering recommendations by their score.
   */
  threshold: number;
  /**
   * The max number of recommendations to retrieve. If it\'s set to 0, all the recommendations of the objectID may be returned.
   */
  maxRecommendations?: number;
  /**
   * The Algolia search parameters.
   */
  queryParameters?: (BaseSearchParams & IndexSettingsAsSearchParams) | null;
  /**
   * The Algolia search parameters when there are no recommendations.
   */
  fallbackParameters?: (BaseSearchParams & IndexSettingsAsSearchParams) | null;
};

export namespace RecommendationRequest {
  export enum ModelEnum {
    RelatedProducts = 'related-products',
    BoughtTogether = 'bought-together',
  }
}
