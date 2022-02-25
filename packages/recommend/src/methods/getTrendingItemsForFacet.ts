import { BaseRecommendClient, TrendingItemsForFacetQuery, WithRecommendMethods } from '../types';
import { getRecommendations } from './getRecommendations';

type GetTrendingItemsForFacet = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getTrendingItemsForFacet'];

export const getTrendingItemsForFacet: GetTrendingItemsForFacet = base => {
  return (queries: readonly TrendingItemsForFacetQuery[], requestOptions) => {
    return getRecommendations(base)(
      queries.map(query => ({
        ...query,
        model: 'trending-items',
      })),
      requestOptions
    );
  };
};
