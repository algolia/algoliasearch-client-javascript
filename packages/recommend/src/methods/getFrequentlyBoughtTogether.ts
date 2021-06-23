import { RecommendClient, WithRecommendMethods } from '../types';
import { getRecommendations, GetRecommendationsOptions } from './getRecommendations';

export type GetFrequentlyBoughtTogetherOptions = Omit<
  GetRecommendationsOptions,
  'model' | 'fallbackParameters'
>;

type GetFrequentlyBoughtTogether = (
  base: RecommendClient
) => WithRecommendMethods<RecommendClient>['getFrequentlyBoughtTogether'];

export const getFrequentlyBoughtTogether: GetFrequentlyBoughtTogether = base => {
  return (options, requestOptions) => {
    return getRecommendations(base)(
      {
        ...options,
        fallbackParameters: {},
        model: 'bought-together',
      },
      requestOptions
    );
  };
};
