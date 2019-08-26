import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { Method } from '@algolia/requester-types';
import { ConstructorOf } from '../../helpers';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const search = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  return class extends base implements HasSearch {
    public search<THit>(
      query: string,
      requestOptions?: RequestOptions & SearchOptions
    ): Promise<SearchResponse<THit>> {
      return this.transporter.read(
        {
          method: Method.Post,
          path: `1/indexes/${this.indexName}/query`,
          data: {
            query,
          },
        },
        requestOptions
      );
    }
  };
};

export type HasSearch = SearchIndex & {
  readonly search: <THit>(
    query: string,
    requestOptions?: RequestOptions & SearchOptions
  ) => Promise<SearchResponse<THit>>;
};

export type SearchOptions = {
  readonly similarQuery?: string;
  readonly facetFilters?: string | ReadonlyArray<string | readonly string[]>;
  readonly optionalFilters?: string | ReadonlyArray<string | readonly string[]>;
  readonly numericFilters?: string | ReadonlyArray<string | readonly string[]>;
  readonly tagFilters?: string | ReadonlyArray<string | readonly string[]>;
  readonly sumOrFiltersScores?: boolean;
  readonly filters?: string;
  readonly page?: number;
  readonly hitsPerPage?: number;
  readonly offset?: number;
  readonly length?: number;
  readonly attributesToHighlight?: readonly string[];
  readonly attributesToSnippet?: readonly string[];
  readonly attributesToRetrieve?: readonly string[];
  readonly highlightPreTag?: string;
  readonly highlightPostTag?: string;
  readonly snippetEllipsisText?: string;
  readonly restrictHighlightAndSnippetArrays?: boolean;
  readonly facets?: string | readonly string[];
  readonly maxValuesPerFacet?: number;
  readonly facetingAfterDistinct?: boolean;
  readonly minWordSizefor1Typo?: number;
  readonly minWordSizefor2Typos?: number;
  readonly allowTyposOnNumericTokens?: boolean;
  readonly disableTypoToleranceOnAttributes?: readonly string[];
  readonly queryType?: string;
  readonly removeWordsIfNoResults?: string;
  readonly advancedSyntax?: boolean;
  readonly advancedSyntaxFeatures?: readonly string[];
  readonly optionalWords?: readonly string[];
  readonly disableExactOnAttributes?: readonly string[];
  readonly exactOnSingleWordQuery?: string;
  readonly alternativesAsExact?: readonly string[];
  readonly enableRules?: boolean;
  readonly ruleContexts?: readonly string[];
  readonly distinct?: number;
  readonly analytics?: boolean;
  readonly analyticsTags?: readonly string[];
  readonly synonyms?: boolean;
  readonly replaceSynonymsInHighlight?: boolean;
  readonly minProximity?: number;
  readonly responseFields?: readonly string[];
  readonly maxFacetHits?: number;
  readonly percentileComputation?: boolean;
  readonly clickAnalytics?: boolean;
  readonly personalizationImpact?: number;
  readonly enablePersonalization?: boolean;
  readonly restrictSearchableAttributes?: readonly string[];
  readonly sortFacetValuesBy?: string;
  readonly typoTolerance?: any;
  readonly aroundLatLng?: string;
  readonly aroundLatLngViaIP?: boolean;
  readonly aroundRadius?: any;
  readonly aroundPrecision?: number;
  readonly minimumAroundRadius?: number;
  readonly insideBoundingBox?: ReadonlyArray<readonly number[]>;
  readonly insidePolygon?: ReadonlyArray<readonly number[]>;
  readonly ignorePlurals?: any;
  readonly removeStopWords?: readonly string[];
  readonly getRankingInfo?: boolean;
};

export type SearchResponse<THit> = {
  readonly hits: readonly THit[];
  readonly queryID?: string;
};
