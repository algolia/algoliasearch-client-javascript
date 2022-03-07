import { RecommendationsQuery } from './RecommendationsQuery';

export type TrendingGlobalItemsQuery = Omit<
  RecommendationsQuery,
  'model' | 'objectID' | 'facetName' | 'facetValue'
>;
