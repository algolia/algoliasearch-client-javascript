import { MethodEnum } from '@algolia/requester-common/src';

import { BaseRecommendClient, RecommendedForYouQuery, WithRecommendMethods } from '../types';

type GetRecommendedForYou = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getRecommendedForYou'];

export const getRecommendedForYou: GetRecommendedForYou = base => {
  return (queries: readonly RecommendedForYouQuery[], requestOptions) => {
    const requests: readonly RecommendedForYouQuery[] = queries.map(query => ({
      ...query,
      model: 'recommended-for-you',
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
