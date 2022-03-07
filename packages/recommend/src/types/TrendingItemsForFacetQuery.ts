import { RecommendationsQuery } from './RecommendationsQuery';

export type TrendingItemsForFacetQuery = Omit<RecommendationsQuery, 'model' | 'objectID'> &
  Required<Pick<RecommendationsQuery, 'facetName' | 'facetValue'>>;
