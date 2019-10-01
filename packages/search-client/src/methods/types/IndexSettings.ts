export type IndexSettings = {
  /* eslint-disable functional/prefer-readonly-type */
  searchableAttributes?: string[];
  attributesForFaceting?: string[];
  unretrievableAttributes?: string[];
  attributesToRetrieve?: string[];
  ranking?: string[];
  customRanking?: string[];
  replicas?: string[];
  primary?: string;
  maxValuesPerFacet?: number | null;
  sortFacetValuesBy?: string;
  attributesToHighlight?: string[];
  attributesToSnippet?: string[];
  highlightPreTag?: string;
  highlightPostTag?: string;
  snippetEllipsisText?: string;
  restrictHighlightAndSnippetArrays?: boolean | null;
  hitsPerPage?: number | null;
  paginationLimitedTo?: number | null;
  minWordSizefor1Typo?: number | null;
  minWordSizefor2Typos?: number | null;
  typoTolerance?: string | boolean;
  allowTyposOnNumericTokens?: boolean | null;
  disableTypoToleranceOnAttributes?: string[];
  disableTypoToleranceOnWords?: string[];
  separatorsToIndex?: string;
  ignorePlurals?: string[] | boolean;
  queryLanguages?: string[];
  enableRules?: boolean | null;
  queryType?: string;
  removeWordsIfNoResults?: string;
  advancedSyntax?: boolean | null;
  advancedSyntaxFeatures?: string[];
  optionalWords?: string[];
  disablePrefixOnAttributes?: string[];
  disableExactOnAttributes?: string[];
  exactOnSingleWordQuery?: string;
  alternativesAsExact?: string[];
  removeStopWords?: string[] | boolean;
  numericAttributesForFiltering?: string[];
  allowCompressionOfIntegerArray?: boolean | null;
  attributeForDistinct?: string;
  distinct?: number | boolean;
  replaceSynonymsInHighlight?: boolean | null;
  attributeCriteriaComputedByMinProximity?: boolean | null;
  minProximity?: number | null;
  responseFields?: string[];
  maxFacetHits?: number | null;
  camelCaseAttributes?: string[];
  decompoundedAttributes?: { [key: string]: string[] };
  keepDiacriticsOnCharacters?: string;
  userData?: any;
};