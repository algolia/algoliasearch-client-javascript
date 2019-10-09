import { AutomaticFacetFilter } from './AutomaticFacetFilter';
import { ConsequenceQuery } from './ConsequenceQuery';

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

export type ConsequenceParams = {
  /* eslint-disable functional/prefer-readonly-type */

  /**
   * When providing a string, it replaces the entire query string.
   * When providing an object, it describes incremental edits to be made to the query string (but you can’t do both).
   */
  query?: ConsequenceQuery | string | Map<string, string[]>;

  /** Names of facets to which automatic filtering must be applied; they must match the facet name of a facet value placeholder in the query pattern. */
  automaticFacetFilters?: AutomaticFacetFilter[] | string[];

  /**
   * Same syntax as automaticFacetFilters, but the engine treats the filters as optional.
   * Behaves like optionalFilters.
   */
  automaticOptionalFacetFilters?: AutomaticFacetFilter[];
};
