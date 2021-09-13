import { BaseRecommendClient, RelatedProductsQuery, WithRecommendMethods } from '../types';
import { getRecommendations } from './getRecommendations';

export type GetRelatedProducts = (
  base: BaseRecommendClient
) => WithRecommendMethods<BaseRecommendClient>['getRelatedProducts'];

export const getRelatedProducts: GetRelatedProducts = base => {
  return (queries: readonly RelatedProductsQuery[], requestOptions) => {
    return getRecommendations(base)(
      queries.map(query => ({
        ...query,
        model: 'related-products',
      })),
      requestOptions
    );
  };
};
