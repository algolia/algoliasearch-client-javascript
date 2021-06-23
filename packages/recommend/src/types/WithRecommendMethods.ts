import { MultipleQueriesResponse, SearchOptions } from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';

import {
  GetFrequentlyBoughtTogetherQuery,
  GetRecommendationsQuery,
  GetRelatedProductsQuery,
} from '../methods';

export type WithRecommendMethods<TType> = TType & {
  /**
   * Returns recommendations.
   */
  readonly getRecommendations: <TObject>(
    queries: readonly GetRecommendationsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns [Related Products](https://algolia.com/doc/guides/algolia-ai/recommend/#related-products).
   */
  readonly getRelatedProducts: <TObject>(
    queries: readonly GetRelatedProductsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns [Frequently Bought Together](https://algolia.com/doc/guides/algolia-ai/recommend/#frequently-bought-together) products.
   */
  readonly getFrequentlyBoughtTogether: <TObject>(
    queries: readonly GetFrequentlyBoughtTogetherQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;
};
