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
  /* eslint-disable functional/prefer-readonly-type */
  similarQuery?: string;
  facetFilters?: string[][];
  optionalFilters?: string[][];
  numericFilters?: string[][];
  tagFilters?: string[][];
  sumOrFiltersScores?: boolean;
  filters?: string;
  page?: number;
  hitsPerPage?: number;
  offset?: number;
  length?: number;
  attributesToHighlight?: string[];
  attributesToSnippet?: string[];
  attributesToRetrieve?: string[];
  highlightPreTag?: string;
  highlightPostTag?: string;
  snippetEllipsisText?: string;
  restrictHighlightAndSnippetArrays?: boolean;
  facets?: string[];
  maxValuesPerFacet?: number;
  facetingAfterDistinct?: boolean;
  minWordSizefor1Typo?: number;
  minWordSizefor2Typos?: number;
  allowTyposOnNumericTokens?: boolean;
  disableTypoToleranceOnAttributes?: string[];
  queryType?: string;
  removeWordsIfNoResults?: string;
  advancedSyntax?: boolean;
  advancedSyntaxFeatures?: string[];
  optionalWords?: string[];
  disableExactOnAttributes?: string[];
  exactOnSingleWordQuery?: string;
  alternativesAsExact?: string[];
  enableRules?: boolean;
  ruleContexts?: string[];
  distinct?: number;
  analytics?: boolean;
  analyticsTags?: string[];
  synonyms?: boolean;
  replaceSynonymsInHighlight?: boolean;
  minProximity?: number;
  responseFields?: string[];
  maxFacetHits?: number;
  percentileComputation?: boolean;
  clickAnalytics?: boolean;
  personalizationImpact?: number;
  enablePersonalization?: boolean;
  restrictSearchableAttributes?: string[];
  sortFacetValuesBy?: string;
  typoTolerance?: any;
  aroundLatLng?: string;
  aroundLatLngViaIP?: boolean;
  aroundRadius?: any;
  aroundPrecision?: number;
  minimumAroundRadius?: number;
  insideBoundingBox?: number[][];
  insidePolygon?: number[][];
  ignorePlurals?: any;
  removeStopWords?: string[];
  getRankingInfo?: boolean;
};

export type SearchResponse<THit> = {
  /* eslint-disable functional/prefer-readonly-type */
  hits: THit[];
  page: number;
  length?: number;
  offset?: number;
  nbHits: number;
  nbPages: number;
  hitsPerPage: number;
  processingTimeMs: number;
  exhaustiveNbHits: boolean;
  exhaustiveFacetsCount?: boolean;
  facets?: { [key: string]: { [key: string]: number } };
  facetsStats?: {
    [key: string]: {
      min: number;
      max: number;
      avg: number;
      sum: number;
    };
  };
  query: string;
  queryAfterRemoval?: string;
  params: string;
  queryID?: string;
  message?: string;
  aroundLatLng?: string;
  automaticRadius?: string;
  serverUsed?: string;
  index?: string;
  indexUsed?: string;
  abTestVariantID?: number;
  parsedQuery?: string;
  userData?: any;
  appliedRules?: Array<{ [key: string]: any }>;
};
