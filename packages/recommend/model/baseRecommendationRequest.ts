import type { RecommendationModels } from './recommendationModels';

export type BaseRecommendationRequest = {
  model: RecommendationModels;
  /**
   * Unique identifier of the object.
   */
  objectID: string;
};
