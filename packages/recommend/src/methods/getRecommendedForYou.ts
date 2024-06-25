import { MethodEnum } from '@algolia/requester-common';

import {
  BaseRecommendClient,
  RecommendedForYouParams,
  RecommendedForYouQuery,
  WithRecommendMethods,
} from '../types';

type GetRecommendedForYou = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getRecommendedForYou'];

export const getRecommendedForYou: GetRecommendedForYou = base => {
  return (queries: readonly RecommendedForYouParams[], requestOptions) => {
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
