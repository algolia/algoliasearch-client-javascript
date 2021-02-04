export type SearchOptions = {
  /**
   * Create a new query with an empty search query.
   */
  readonly query?: string;

  /**
   * Allows a search for similar objects, but the query has to be constructed on your end and included alongside an empty query.
   *
   * The similarQuery should be made from the tags and keywords of the relevant object.
   */
  readonly similarQuery?: string;

  /**
   *  Filter hits by facet value.
   */
  readonly facetFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;

  /**
   * Create filters for ranking purposes, where records that match the filter are ranked highest.
   */
  readonly optionalFilters?: string | readonly string[] | ReadonlyArray<readonly string[] | string>;

  /**
   * Filter on numeric attributes.
   */
  readonly numericFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;

  /**
   * Filter hits by tags. tagFilters is a different way of filtering, which relies on the _tags
   * attribute. It uses a simpler syntax than filters. You can use it when you want to do
   * simple filtering based on tags.
   */
  readonly tagFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;

  /**
   * Determines how to calculate the total score for filtering.
   */
  readonly sumOrFiltersScores?: boolean;

  /**
   * Filter the query with numeric, facet and/or tag filters.
   */
  readonly filters?: string;

  /**
   * Specify the page to retrieve.
   */
  readonly page?: number;

  /**
   * Set the number of hits per page.
   */
  readonly hitsPerPage?: number;

  /**
   * Specify the offset of the first hit to return.
   */
  readonly offset?: number;

  /**
   * Set the number of hits to retrieve (used only with offset).
   */
  readonly length?: number;

  /**
   * List of attributes to highlight.
   */
  readonly attributesToHighlight?: readonly string[];

  /**
   * List of attributes to snippet, with an optional maximum number of words to snippet.
   */
  readonly attributesToSnippet?: readonly string[];

  /**
   * Gives control over which attributes to retrieve and which not to retrieve.
   */
  readonly attributesToRetrieve?: readonly string[];

  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   */
  readonly highlightPreTag?: string;

  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results
   */
  readonly highlightPostTag?: string;

  /**
   * String used as an ellipsis indicator when a snippet is truncated.
   */
  readonly snippetEllipsisText?: string;

  /**
   * Restrict highlighting and snippeting to items that matched the query.
   */
  readonly restrictHighlightAndSnippetArrays?: boolean;

  /**
   * Facets to retrieve.
   */
  readonly facets?: readonly string[];

  /**
   * Maximum number of facet values to return for each facet during a regular search.
   */
  readonly maxValuesPerFacet?: number;

  /**
   *  Force faceting to be applied after de-duplication (via the Distinct setting).
   */
  readonly facetingAfterDistinct?: boolean;

  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 1 typo
   */
  readonly minWordSizefor1Typo?: number;

  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 2 typos.
   */
  readonly minWordSizefor2Typos?: number;

  /**
   * Whether to allow typos on numbers (“numeric tokens”) in the query string.
   */
  readonly allowTyposOnNumericTokens?: boolean;

  /**
   * List of attributes on which you want to disable typo tolerance.
   */
  readonly disableTypoToleranceOnAttributes?: readonly string[];

  /**
   * Controls if and how query words are interpreted as prefixes.
   */
  readonly queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone';

  /**
   * Selects a strategy to remove words from the query when it doesn’t match any hits.
   */
  readonly removeWordsIfNoResults?: 'none' | 'lastWords' | 'firstWords' | 'allOptional';

  /**
   * Enables the advanced query syntax.
   */
  readonly advancedSyntax?: boolean;

  /**
   * AdvancedSyntaxFeatures can be exactPhrase or excludeWords
   */
  readonly advancedSyntaxFeatures?: ReadonlyArray<'exactPhrase' | 'excludeWords'>;

  /**
   * A list of words that should be considered as optional when found in the query.
   */
  readonly optionalWords?: string | readonly string[];

  /**
   * List of attributes on which you want to disable the exact ranking criterion.
   */
  readonly disableExactOnAttributes?: readonly string[];

  /**
   * Controls how the exact ranking criterion is computed when the query contains only one word.
   */
  readonly exactOnSingleWordQuery?: 'attribute' | 'none' | 'word';

  /**
   * List of alternatives that should be considered an exact match by the exact ranking criterion.
   */
  readonly alternativesAsExact?: ReadonlyArray<
    'ignorePlurals' | 'singleWordSynonym' | 'multiWordsSynonym'
  >;

  /**
   * Whether rules should be globally enabled.
   */
  readonly enableRules?: boolean;

  /**
   * Enables contextual rules.
   */
  readonly ruleContexts?: readonly string[];

  /**
   * Enables de-duplication or grouping of results.
   */
  readonly distinct?: boolean | number;

  /**
   * Whether the current query will be taken into account in the Analytics
   */
  readonly analytics?: boolean;

  /**
   * List of tags to apply to the query in the analytics.
   */
  readonly analyticsTags?: readonly string[];

  /**
   * Whether to take into account an index’s synonyms for a particular search.
   */
  readonly synonyms?: boolean;

  /**
   * Whether to highlight and snippet the original word that matches the synonym or the synonym itself.
   */
  readonly replaceSynonymsInHighlight?: boolean;

  /**
   * Precision of the proximity ranking criterion.
   */
  readonly minProximity?: number;

  /**
   * Choose which fields the response will contain. Applies to search and browse queries.
   */
  readonly responseFields?: readonly string[];

  /**
   * Maximum number of facet hits to return during a search for facet values.
   */
  readonly maxFacetHits?: number;

  /**
   * Whether to include or exclude a query from the processing-time percentile computation.
   */
  readonly percentileComputation?: boolean;

  /**
   * Enable the Click Analytics feature.
   */
  readonly clickAnalytics?: boolean;

  /**
   * The `personalizationImpact` parameter sets the percentage of the impact that personalization has on ranking records. The
   * value must be between 0 and 100 (inclusive). This parameter will not be taken into account if `enablePersonalization`
   * is **false**.
   */
  readonly personalizationImpact?: number;

  /**
   * Enable personalization for the query
   */
  readonly enablePersonalization?: boolean;

  /**
   * Restricts a given query to look in only a subset of your searchable attributes.
   */
  readonly restrictSearchableAttributes?: readonly string[];

  /**
   * Restricts a given query to look in only a subset of your searchable attributes.
   */
  readonly sortFacetValuesBy?: 'count' | 'alpha';

  /**
   * Controls whether typo tolerance is enabled and how it is applied.
   */
  readonly typoTolerance?: boolean | 'min' | 'strict';

  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   */
  readonly aroundLatLng?: string;

  /**
   * Search for entries around a given location automatically computed from the requester’s IP address.
   */
  readonly aroundLatLngViaIP?: boolean;

  /**
   * Search for entries around a given location automatically computed from the requester’s IP address.
   */
  readonly aroundRadius?: number | 'all';

  /**
   * Precision of geo search (in meters), to add grouping by geo location to the ranking formula.
   */
  readonly aroundPrecision?:
    | number
    | ReadonlyArray<{ readonly from: number; readonly value: number }>;

  /**
   * Minimum radius (in meters) used for a geo search when aroundRadius is not set.
   */
  readonly minimumAroundRadius?: number;

  /**
   * Search inside a rectangular area (in geo coordinates).
   */
  readonly insideBoundingBox?: ReadonlyArray<readonly number[]>;

  /**
   * Search inside a polygon (in geo coordinates).
   */
  readonly insidePolygon?: ReadonlyArray<readonly number[]>;

  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   */
  readonly ignorePlurals?: boolean | readonly string[];

  /**
   * Removes stop (common) words from the query before executing it.
   */
  readonly removeStopWords?: boolean | readonly string[];

  /**
   * List of supported languages with their associated language ISO code.
   *
   * Apply a set of natural language best practices such as ignorePlurals,
   * removeStopWords, removeWordsIfNoResults, analyticsTags and ruleContexts.
   */
  readonly naturalLanguages?: readonly string[];

  /**
   * When true, each hit in the response contains an additional _rankingInfo object.
   */
  readonly getRankingInfo?: boolean;

  /**
   * A user identifier.
   * Format: alpha numeric string [a-zA-Z0-9_-]
   * Length: between 1 and 64 characters.
   */
  readonly userToken?: string;

  /**
   * Can be to enable or disable A/B tests at query time.
   * Engine's default: true
   */
  readonly enableABTest?: boolean;

  /**
   * Enable word segmentation (also called decompounding) at query time for
   * compatible languages. For example, this turns the Dutch query
   * "spaanplaatbehang" into "spaan plaat behang" to retrieve more relevant
   * results.
   */
  readonly decompoundQuery?: boolean;

  /**
   * The relevancy threshold to apply to search in a virtual index [0-100]. A Bigger
   * value means fewer, but more relevant results, smaller value means more, but
   * less relevant results.
   */
  readonly relevancyStrictness?: number;
};
