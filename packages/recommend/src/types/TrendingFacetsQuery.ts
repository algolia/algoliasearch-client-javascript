import { RecommendationsQuery } from './RecommendationsQuery';

export type TrendingFacetsQuery = Omit<RecommendationsQuery, 'model' | 'facetValue' | 'objectID'> &
  Required<Pick<RecommendationsQuery, 'facetName'>>;
