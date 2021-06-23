import { MethodEnum } from '@algolia/requester-common';

import { BaseRecommendClient, RecommendationsQuery, WithRecommendMethods } from '../types';

type GetRecommendations = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getRecommendations'];

export const getRecommendations: GetRecommendations = base => {
  return (queries: readonly RecommendationsQuery[], requestOptions) => {
    const requests: readonly RecommendationsQuery[] = queries.map(query => ({
      // The `threshold` param is required by the endpoint to make it easier
      // to provide a default value later, so we default it in the client
      // so that users don't have to provide a value.
      threshold: 0,
      ...query,
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
