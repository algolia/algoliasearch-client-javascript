import { BaseRecommendClient, TrendingGlobalItemsQuery, WithRecommendMethods } from '../types';
import { getRecommendations } from './getRecommendations';

type GetTrendingGlobalItems = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getTrendingGlobalItems'];

export const getTrendingGlobalItems: GetTrendingGlobalItems = base => {
  return (queries: readonly TrendingGlobalItemsQuery[], requestOptions) => {
    return getRecommendations(base)(
      queries.map(query => ({
        ...query,
        model: 'trending-items',
      })),
      requestOptions
    );
  };
};
