import { RecommendationsQuery } from './RecommendationsQuery';

export type RecommendedForYouQuery = Omit<RecommendationsQuery, 'model' | 'objectID'> & {
  /**
   * A `userToken` to personalise recommendations.
   */
  readonly userToken: string;
};
