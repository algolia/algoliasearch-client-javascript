import { RecommendModel } from './RecommendModel';
import { RecommendSearchOptions } from './RecommendSearchOptions';

export type RecommendationsQuery = {
  readonly indexName: string;
  readonly model: RecommendModel;
  readonly objectID: string;
  readonly threshold?: number;
  readonly maxRecommendations?: number;
  readonly queryParameters?: RecommendSearchOptions;
  readonly fallbackParameters?: RecommendSearchOptions;
};
