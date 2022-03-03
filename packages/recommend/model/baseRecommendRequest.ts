import type { SearchParamsObject } from './searchParamsObject';

export type BaseRecommendRequest = {
  /**
   * The Algolia index name.
   */
  indexName: string;
  /**
   * The threshold to use when filtering recommendations by their score.
   */
  threshold: number;
  /**
   * The max number of recommendations to retrieve. If it\'s set to 0, all the recommendations of the objectID may be returned.
   */
  maxRecommendations?: number;
  queryParameters?: SearchParamsObject;
  fallbackParameters?: SearchParamsObject;
};
