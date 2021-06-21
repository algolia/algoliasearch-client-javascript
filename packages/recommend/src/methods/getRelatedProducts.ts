import { RecommendClient, WithRecommendMethods } from '../types';
import { getRecommendations, GetRecommendationsOptions } from './getRecommendations';

export type GetRelatedProductsOptions = Omit<GetRecommendationsOptions, 'model'>;

type GetRelatedProducts = (
  base: RecommendClient
) => WithRecommendMethods<RecommendClient>['getRelatedProducts'];

export const getRelatedProducts: GetRelatedProducts = base => {
  return (options, requestOptions) => {
    return getRecommendations(base)(
      {
        ...options,
        model: 'related-products',
      },
      requestOptions
    );
  };
};
