import { TrendingQuery } from './TrendingQuery';

export type TrendingItemsQuery = Omit<TrendingQuery, 'model'>;
