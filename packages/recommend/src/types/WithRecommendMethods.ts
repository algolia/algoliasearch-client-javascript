import { MultipleQueriesResponse, SearchOptions } from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';

import { FrequentlyBoughtTogetherQuery } from './FrequentlyBoughtTogetherQuery';
import { RecommendationsQuery } from './RecommendationsQuery';
import { RelatedProductsQuery } from './RelatedProductsQuery';
import { TrendingFacetsQuery } from './TrendingFacetsQuery';
import { TrendingGlobalItemsQuery } from './TrendingGlobalItemsQuery';
import { TrendingItemsForFacetQuery } from './TrendingItemsForFacetQuery';

export type WithRecommendMethods<TType> = TType & {
  /**
   * Returns recommendations.
   */
  readonly getRecommendations: <TObject>(
    queries: readonly RecommendationsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns [Related Products](https://algolia.com/doc/guides/algolia-ai/recommend/#related-products).
   */
  readonly getRelatedProducts: <TObject>(
    queries: readonly RelatedProductsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns [Frequently Bought Together](https://algolia.com/doc/guides/algolia-ai/recommend/#frequently-bought-together) products.
   */
  readonly getFrequentlyBoughtTogether: <TObject>(
    queries: readonly FrequentlyBoughtTogetherQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns trending items
   */
  readonly getTrendingGlobalItems: <TObject>(
    queries: readonly TrendingGlobalItemsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns trending items per facet
   */
  readonly getTrendingItemsForFacet: <TObject>(
    queries: readonly TrendingItemsForFacetQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;

  /**
   * Returns trending items per facet
   */
  readonly getTrendingFacets: <TObject>(
    queries: readonly TrendingFacetsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<MultipleQueriesResponse<TObject>>>;
};
