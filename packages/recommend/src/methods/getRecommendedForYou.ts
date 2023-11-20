import { BaseRecommendClient, RecommendedForYouQuery, WithRecommendMethods } from '../types';
import { getRecommendations } from './getRecommendations';

type GetRecommendedForYou = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getRecommendedForYou'];

export const getRecommendedForYou: GetRecommendedForYou = base => {
  return (queries: readonly RecommendedForYouQuery[], requestOptions) => {
    return getRecommendations(base)(
      queries.map(query => ({
        ...query,
        model: 'recommended-for-you',
      })),
      requestOptions
    );
  };
};
