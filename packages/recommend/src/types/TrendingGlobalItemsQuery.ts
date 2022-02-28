import { TrendingQuery } from './TrendingQuery';

export type TrendingGlobalItemsQuery = Omit<TrendingQuery, 'model' | 'facetName' | 'facetValue'>;
