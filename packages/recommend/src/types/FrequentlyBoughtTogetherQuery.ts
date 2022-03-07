import { RecommendationsQuery } from './RecommendationsQuery';

export type FrequentlyBoughtTogetherQuery = Omit<
  RecommendationsQuery,
  'model' | 'fallbackParameters' | 'facetName' | 'facetValue'
> &
  Required<Pick<RecommendationsQuery, 'objectID'>>;
