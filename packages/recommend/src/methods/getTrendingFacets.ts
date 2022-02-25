import { BaseRecommendClient, TrendingFacetsQuery, WithRecommendMethods } from '../types';
import { getRecommendations } from './getRecommendations';

type GetTrendingFacets = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getTrendingFacets'];

export const getTrendingFacets: GetTrendingFacets = base => {
  return (queries: readonly TrendingFacetsQuery[], requestOptions) => {
    return getRecommendations(base)(
      queries.map(query => ({
        ...query,
        model: 'trending-facets',
      })),
      requestOptions
    );
  };
};
