import { RecommendationsQuery } from './RecommendationsQuery';

export type TrendingItemsQuery = Omit<RecommendationsQuery, 'model' | 'objectID'>;
