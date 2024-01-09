import { MethodEnum } from '@algolia/requester-common';

import {
  BaseRecommendClient,
  RecommendationsQuery,
  RecommendedForYouQuery,
  TrendingQuery,
  WithRecommendMethods,
} from '../types';

type GetRecommendations = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getRecommendations'];

export const getRecommendations: GetRecommendations = base => {
  return (queries, requestOptions) => {
    const requests: ReadonlyArray<
      RecommendationsQuery | TrendingQuery | RecommendedForYouQuery
    > = queries.map(query => ({
      ...query,
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
