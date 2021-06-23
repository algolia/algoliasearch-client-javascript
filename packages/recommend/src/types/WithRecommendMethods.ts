import { MultipleQueriesResponse, SearchOptions } from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';

import {
  GetFrequentlyBoughtTogetherOptions,
  GetRecommendationsOptions,
  GetRelatedProductsOptions,
} from '../methods';

export type WithRecommendMethods<TType> = TType & {
  /**
   * Returns recommendations.
   */
  readonly getRecommendations: <TObject>(
    options: GetRecommendationsOptions,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns [Related Products](https://algolia.com/doc/guides/algolia-ai/recommend/#related-products).
   */
  readonly getRelatedProducts: <TObject>(
    options: GetRelatedProductsOptions,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns [Frequently Bought Together](https://algolia.com/doc/guides/algolia-ai/recommend/#frequently-bought-together) products.
   */
  readonly getFrequentlyBoughtTogether: <TObject>(
    options: GetFrequentlyBoughtTogetherOptions,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;
};
