import { RecommendationsQuery } from './RecommendationsQuery';

export type TrendingItemsForFacetQuery = Omit<RecommendationsQuery, 'model' | 'objectID'>;
