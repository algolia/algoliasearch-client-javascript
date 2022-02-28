import { MethodEnum } from '@algolia/requester-common';

import { BaseRecommendClient, TrendingGlobalItemsQuery, WithRecommendMethods } from '../types';

type GetTrendingGlobalItems = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getTrendingGlobalItems'];

export const getTrendingGlobalItems: GetTrendingGlobalItems = base => {
  return (queries: readonly TrendingGlobalItemsQuery[], requestOptions) => {
    const requests: readonly TrendingGlobalItemsQuery[] = queries.map(query => ({
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
