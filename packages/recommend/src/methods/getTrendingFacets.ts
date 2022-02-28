import { MethodEnum } from '@algolia/requester-common';

import { BaseRecommendClient, TrendingFacetsQuery, WithRecommendMethods } from '../types';

type GetTrendingFacets = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getTrendingFacets'];

export const getTrendingFacets: GetTrendingFacets = base => {
  return (queries: readonly TrendingFacetsQuery[], requestOptions) => {
    const requests: readonly TrendingFacetsQuery[] = queries.map(query => ({
      ...query,
      model: 'trending-facets',
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
