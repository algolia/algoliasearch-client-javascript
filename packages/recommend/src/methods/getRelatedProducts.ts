import { RecommendClient, WithRecommendMethods } from '../types';
import { getRecommendations, GetRecommendationsQuery } from './getRecommendations';

export type GetRelatedProductsQuery = Omit<GetRecommendationsQuery, 'model'>;

type GetRelatedProducts = (
  base: RecommendClient
) => WithRecommendMethods<RecommendClient>['getRelatedProducts'];

export const getRelatedProducts: GetRelatedProducts = base => {
  return (queries, requestOptions) => {
    return getRecommendations(base)(
      queries.map(query => ({
        ...query,
        model: 'related-products',
      })),
      requestOptions
    );
  };
};
