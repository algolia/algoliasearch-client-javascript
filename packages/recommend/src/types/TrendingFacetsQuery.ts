import { RecommendationsQuery } from './RecommendationsQuery';

export type TrendingFacetsQuery = Omit<RecommendationsQuery, 'model' | 'objectID' | 'facetValue'>;
