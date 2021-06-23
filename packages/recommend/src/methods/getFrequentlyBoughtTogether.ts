import { BaseRecommendClient, FrequentlyBoughtTogetherQuery, WithRecommendMethods } from '../types';
import { getRecommendations } from './getRecommendations';

type GetFrequentlyBoughtTogether = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getFrequentlyBoughtTogether'];

export const getFrequentlyBoughtTogether: GetFrequentlyBoughtTogether = base => {
  return (queries: readonly FrequentlyBoughtTogetherQuery[], requestOptions) => {
    return getRecommendations(base)(
      queries.map(query => ({
        ...query,
        fallbackParameters: {},
        model: 'bought-together',
      })),
      requestOptions
    );
  };
};
