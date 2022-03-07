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
        model: 'trending-items',
        // The `threshold` param is required by the endpoint to make it easier
        // to provide a default value later, so we default it in the client
        // so that users don't have to provide a value.
        threshold: query.threshold || 0,
      })),
      requestOptions
    );
  };
};
