export type SearchParams = {
  /**
   * The text to search in the index.
   */
  query: string;
  /**
   * Overrides the query parameter and performs a more generic search that can be used to find \"similar\" results.
   */
  similarQuery?: string;
  /**
   * The complete list of attributes used for searching.
   */
  searchableAttributes?: Array<string>;
  /**
   * The complete list of attributes that will be used for faceting.
   */
  attributesForFaceting?: Array<string>;
  /**
   * List of attributes that can’t be retrieved at query time.
   */
  unretrievableAttributes?: Array<string>;
  /**
   * This parameter controls which attributes to retrieve and which not to retrieve.
   */
  attributesToRetrieve?: Array<string>;
  /**
   * Restricts a given query to look in only a subset of your searchable attributes.
   */
  restrictSearchableAttributes?: Array<string>;
  /**
   * Controls how Algolia should sort your results.
   */
  ranking?: Array<string>;
  /**
   * Specifies the custom ranking criterion.
   */
  customRanking?: Array<string>;
  /**
   * Controls the relevancy threshold below which less relevant results aren’t included in the results.
   */
  relevancyStrictness?: number;
  /**
   * Filter the query with numeric, facet and/or tag filters.
   */
  filters?: string;
  /**
   * Filter hits by facet value.
   */
  facetFilters?: Array<string>;
  /**
   * Create filters for ranking purposes, where records that match the filter are ranked higher, or lower in the case of a negative optional filter.
   */
  optionalFilters?: Array<string>;
  /**
   * Filter on numeric attributes.
   */
  numericFilters?: Array<string>;
  /**
   * Filter hits by tags.
   */
  tagFilters?: Array<string>;
  /**
   * Determines how to calculate the total score for filtering.
   */
  sumOrFiltersScores?: boolean;
  /**
   * Retrieve facets and their facet values.
   */
  facets?: Array<string>;
  /**
   * Maximum number of facet values to return for each facet during a regular search.
   */
  maxValuesPerFacet?: number;
  /**
   * Force faceting to be applied after de-duplication (via the Distinct setting).
   */
  facetingAfterDistinct?: boolean;
  /**
   * Controls how facet values are fetched.
   */
  sortFacetValuesBy?: string;
  /**
   * List of attributes to highlight.
   */
  attributesToHighlight?: Array<string>;
  /**
   * List of attributes to snippet, with an optional maximum number of words to snippet.
   */
  attributesToSnippet?: Array<string>;
  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   */
  highlightPreTag?: string;
  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results.
   */
  highlightPostTag?: string;
  /**
   * String used as an ellipsis indicator when a snippet is truncated.
   */
  snippetEllipsisText?: string;
  /**
   * Restrict highlighting and snippeting to items that matched the query.
   */
  restrictHighlightAndSnippetArrays?: boolean;
  /**
   * Specify the page to retrieve.
   */
  page?: number;
  /**
   * Set the number of hits per page.
   */
  hitsPerPage?: number;
  /**
   * Specify the offset of the first hit to return.
   */
  offset?: number;
  /**
   * Set the number of hits to retrieve (used only with offset).
   */
  length?: number;
  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 1 typo.
   */
  minWordSizefor1Typo?: number;
  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 2 typos.
   */
  minWordSizefor2Typos?: number;
  /**
   * Controls whether typo tolerance is enabled and how it is applied.
   */
  typoTolerance?: SearchParams.TypoToleranceEnum;
  /**
   * Whether to allow typos on numbers (“numeric tokens”) in the query string.
   */
  allowTyposOnNumericTokens?: boolean;
  /**
   * List of attributes on which you want to disable typo tolerance.
   */
  disableTypoToleranceOnAttributes?: Array<string>;
  /**
   * Control which separators are indexed.
   */
  separatorsToIndex?: string;
  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   */
  aroundLatLng?: string;
  /**
   * Search for entries around a given location automatically computed from the requester’s IP address.
   */
  aroundLatLngViaIP?: boolean;
  aroundRadius?: number | string;
  /**
   * Precision of geo search (in meters), to add grouping by geo location to the ranking formula.
   */
  aroundPrecision?: number;
  /**
   * Minimum radius (in meters) used for a geo search when aroundRadius is not set.
   */
  minimumAroundRadius?: number;
  /**
   * Search inside a rectangular area (in geo coordinates).
   */
  insideBoundingBox?: Array<number>;
  /**
   * Search inside a polygon (in geo coordinates).
   */
  insidePolygon?: Array<number>;
  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   */
  ignorePlurals?: string;
  /**
   * Removes stop (common) words from the query before executing it.
   */
  removeStopWords?: string;
  /**
   * List of characters that the engine shouldn’t automatically normalize.
   */
  keepDiacriticsOnCharacters?: string;
  /**
   * Sets the languages to be used by language-specific settings and functionalities such as ignorePlurals, removeStopWords, and CJK word-detection.
   */
  queryLanguages?: Array<string>;
  /**
   * This parameter changes the default values of certain parameters and settings that work best for a natural language query, such as ignorePlurals, removeStopWords, removeWordsIfNoResults, analyticsTags and ruleContexts. These parameters and settings work well together when the query is formatted in natural language instead of keywords, for example when your user performs a voice search.
   */
  naturalLanguages?: Array<string>;
  /**
   * Splits compound words into their composing atoms in the query.
   */
  decompoundQuery?: boolean;
  /**
   * Whether Rules should be globally enabled.
   */
  enableRules?: boolean;
  /**
   * Enables contextual rules.
   */
  ruleContexts?: Array<string>;
  /**
   * Enable the Personalization feature.
   */
  enablePersonalization?: boolean;
  /**
   * Define the impact of the Personalization feature.
   */
  personalizationImpact?: number;
  /**
   * Associates a certain user token with the current search.
   */
  userToken?: string;
  /**
   * Controls if and how query words are interpreted as prefixes.
   */
  queryType?: SearchParams.QueryTypeEnum;
  /**
   * Selects a strategy to remove words from the query when it doesn’t match any hits.
   */
  removeWordsIfNoResults?: SearchParams.RemoveWordsIfNoResultsEnum;
  /**
   * Enables the advanced query syntax.
   */
  advancedSyntax?: boolean;
  /**
   * A list of words that should be considered as optional when found in the query.
   */
  optionalWords?: Array<string>;
  /**
   * List of attributes on which you want to disable the exact ranking criterion.
   */
  disableExactOnAttributes?: Array<string>;
  /**
   * Controls how the exact ranking criterion is computed when the query contains only one word.
   */
  exactOnSingleWordQuery?: SearchParams.ExactOnSingleWordQueryEnum;
  /**
   * List of alternatives that should be considered an exact match by the exact ranking criterion.
   */
  alternativesAsExact?: Array<SearchParams.AlternativesAsExactEnum>;
  /**
   * Allows you to specify which advanced syntax features are active when ‘advancedSyntax’ is enabled.
   */
  advancedSyntaxFeatures?: Array<SearchParams.AdvancedSyntaxFeaturesEnum>;
  /**
   * Enables de-duplication or grouping of results.
   */
  distinct?: number;
  /**
   * Retrieve detailed ranking information.
   */
  getRankingInfo?: boolean;
  /**
   * Enable the Click Analytics feature.
   */
  clickAnalytics?: boolean;
  /**
   * Whether the current query will be taken into account in the Analytics.
   */
  analytics?: boolean;
  /**
   * List of tags to apply to the query for analytics purposes.
   */
  analyticsTags?: Array<string>;
  /**
   * Whether to take into account an index’s synonyms for a particular search.
   */
  synonyms?: boolean;
  /**
   * Whether to highlight and snippet the original word that matches the synonym or the synonym itself.
   */
  replaceSynonymsInHighlight?: boolean;
  /**
   * Precision of the proximity ranking criterion.
   */
  minProximity?: number;
  /**
   * Choose which fields to return in the API response. This parameters applies to search and browse queries.
   */
  responseFields?: Array<string>;
  /**
   * Maximum number of facet hits to return during a search for facet values.
   */
  maxFacetHits?: number;
  /**
   * Whether to include or exclude a query from the processing-time percentile computation.
   */
  percentileComputation?: boolean;
  /**
   * When attribute is ranked above proximity in your ranking formula, proximity is used to select which searchable attribute is matched in the attribute ranking stage.
   */
  attributeCriteriaComputedByMinProximity?: boolean;
  /**
   * Whether this search should participate in running AB tests.
   */
  enableABTest?: boolean;
  /**
   * Whether this search should use AI Re-Ranking.
   */
  enableReRanking?: boolean;
  /**
   * Content defining how the search interface should be rendered. Can be set via the settings for a default value and can be overridden via rules.
   */
  renderingContent?: object;
};

export namespace SearchParams {
  export enum TypoToleranceEnum {
    True = 'true',
    False = 'false',
    Min = 'min',
    Strict = 'strict',
  }
  export enum QueryTypeEnum {
    PrefixLast = 'prefixLast',
    PrefixAll = 'prefixAll',
    PrefixNone = 'prefixNone',
  }
  export enum RemoveWordsIfNoResultsEnum {
    None = 'none',
    LastWords = 'lastWords',
    FirstWords = 'firstWords',
    AllOptional = 'allOptional',
  }
  export enum ExactOnSingleWordQueryEnum {
    Attribute = 'attribute',
    None = 'none',
    Word = 'word',
  }
  export enum AlternativesAsExactEnum {
    IgnorePlurals = 'ignorePlurals',
    SingleWordSynonym = 'singleWordSynonym',
    MultiWordsSynonym = 'multiWordsSynonym',
  }
  export enum AdvancedSyntaxFeaturesEnum {
    ExactPhrase = 'exactPhrase',
    ExcludeWords = 'excludeWords',
  }
}
