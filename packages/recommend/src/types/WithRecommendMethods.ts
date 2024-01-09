import { SearchOptions, SearchResponse } from '@algolia/client-search';
import { RequestOptions } from '@algolia/transporter';

import { RecommendedForYouParams, RecommendedForYouQuery } from '../builds/node';
import { FrequentlyBoughtTogetherQuery } from './FrequentlyBoughtTogetherQuery';
import { LookingSimilarQuery } from './LookingSimilarQuery';
import { RecommendationsQuery } from './RecommendationsQuery';
import { RelatedProductsQuery } from './RelatedProductsQuery';
import { TrendingFacetsQuery } from './TrendingFacetsQuery';
import { TrendingFacetsResponse } from './TrendingFacetsResponse';
import { TrendingItemsQuery } from './TrendingItemsQuery';
import { TrendingQuery } from './TrendingQuery';

export type RecommendTrendingFacetsQueriesResponse = {
  /**
   * The list of results.
   */
  readonly results: readonly TrendingFacetsResponse[];
};

export type RecommendQueriesResponse<TObject> = {
  /**
   * The list of results.
   */
  readonly results: ReadonlyArray<SearchResponse<TObject>>;
};

export type WithRecommendMethods<TType> = TType & {
  /**
   * Returns recommendations.
   */
  readonly getRecommendations: <TObject>(
    queries: ReadonlyArray<RecommendationsQuery | TrendingQuery | RecommendedForYouQuery>,
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<RecommendQueriesResponse<TObject>>>;

  /**
   * Returns [Related Products](https://algolia.com/doc/guides/algolia-ai/recommend/#related-products).
   */
  readonly getRelatedProducts: <TObject>(
    queries: readonly RelatedProductsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<RecommendQueriesResponse<TObject>>>;

  /**
   * Returns [Frequently Bought Together](https://algolia.com/doc/guides/algolia-ai/recommend/#frequently-bought-together) products.
   */
  readonly getFrequentlyBoughtTogether: <TObject>(
    queries: readonly FrequentlyBoughtTogetherQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<RecommendQueriesResponse<TObject>>>;

  /**
   * Returns trending items
   */
  readonly getTrendingItems: <TObject>(
    queries: readonly TrendingItemsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<RecommendQueriesResponse<TObject>>>;

  /**
   * Returns trending items per facet
   */
  readonly getTrendingFacets: <TObject>(
    queries: readonly TrendingFacetsQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<RecommendTrendingFacetsQueriesResponse>>;

  /**
   * Returns Looking Similar
   */
  readonly getLookingSimilar: <TObject>(
    queries: readonly LookingSimilarQuery[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<RecommendQueriesResponse<TObject>>>;

  /**
   * Returns Recommended for you
   */
  readonly getRecommendedForYou: <TObject>(
    queries: readonly RecommendedForYouParams[],
    requestOptions?: RequestOptions & SearchOptions
  ) => Readonly<Promise<RecommendQueriesResponse<TObject>>>;
};
