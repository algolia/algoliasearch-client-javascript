import { TrendingQuery } from './TrendingQuery';

export type TrendingItemsForFacetQuery = Omit<TrendingQuery, 'model'>;
