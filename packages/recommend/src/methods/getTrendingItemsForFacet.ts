import { BaseRecommendClient, TrendingItemsForFacetQuery, WithRecommendMethods } from '../types';
import { getTrendingGlobalItems } from '.';

type GetTrendingItemsForFacet = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getTrendingItemsForFacet'];

export const getTrendingItemsForFacet: GetTrendingItemsForFacet = base => {
  return (queries: readonly TrendingItemsForFacetQuery[], requestOptions) => {
    return getTrendingGlobalItems(base)(
      queries.map(query => ({
        ...query,
      })),
      requestOptions
    );
  };
};
