import { TrendingFacetsQuery } from '../types/TrendingFacetsQuery';
import { TrendingItemsQuery } from '../types/TrendingItemsQuery';
import { TrendingModel } from './RecommendModel';

export type TrendingQuery =
  | (TrendingItemsQuery & { readonly model: TrendingModel })
  | (TrendingFacetsQuery & { readonly model: TrendingModel });
