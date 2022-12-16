import { TrendingQuery } from './TrendingQuery';

export type TrendingFacetsQuery = Omit<
  TrendingQuery,
  'model' | 'facetValue' | 'fallbackParameters' | 'queryParameters'
>;
