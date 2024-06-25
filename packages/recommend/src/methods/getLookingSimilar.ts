import { BaseRecommendClient, LookingSimilarQuery, WithRecommendMethods } from '../types';
import { getRecommendations } from './getRecommendations';

type GetLookingSimilar = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getLookingSimilar'];

export const getLookingSimilar: GetLookingSimilar = base => {
  return (queries: readonly LookingSimilarQuery[], requestOptions) => {
    return getRecommendations(base)(
      queries.map(query => ({
        ...query,
        model: 'looking-similar',
      })),
      requestOptions
    );
  };
};
