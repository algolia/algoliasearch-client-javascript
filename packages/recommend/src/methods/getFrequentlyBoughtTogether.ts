import { RecommendClient, WithRecommendMethods } from '../types';
import { getRecommendations, GetRecommendationsQuery } from './getRecommendations';

export type GetFrequentlyBoughtTogetherQuery = Omit<
  GetRecommendationsQuery,
  'model' | 'fallbackParameters'
>;

type GetFrequentlyBoughtTogether = (
  base: RecommendClient
) => WithRecommendMethods<RecommendClient>['getFrequentlyBoughtTogether'];

export const getFrequentlyBoughtTogether: GetFrequentlyBoughtTogether = base => {
  return (queries, requestOptions) => {
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
