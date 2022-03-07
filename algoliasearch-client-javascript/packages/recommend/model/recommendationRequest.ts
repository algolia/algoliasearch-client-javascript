import type { BaseRecommendRequest } from './baseRecommendRequest';
import type { BaseRecommendationRequest } from './baseRecommendationRequest';

export type RecommendationRequest = BaseRecommendationRequest &
  BaseRecommendRequest;
