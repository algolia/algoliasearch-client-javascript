import { MethodEnum } from '@algolia/requester-common';

import { BaseRecommendClient, TrendingItemsQuery, WithRecommendMethods } from '../types';

type GetTrendingItems = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getTrendingItems'];

export const getTrendingItems: GetTrendingItems = base => {
  return (queries: readonly TrendingItemsQuery[], requestOptions) => {
    const requests: readonly TrendingItemsQuery[] = queries.map(query => ({
      ...query,
      model: 'trending-items',
      // The `threshold` param is required by the endpoint to make it easier
      // to provide a default value later, so we default it in the client
      // so that users don't have to provide a value.
      threshold: query.threshold || 0,
    }));

    return base.transporter.read(
      {
        method: MethodEnum.Post,
        path: '1/indexes/*/recommendations',
        data: {
          requests,
        },
        cacheable: true,
      },
      requestOptions
    );
  };
};
