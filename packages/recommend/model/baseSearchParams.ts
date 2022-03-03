export type BaseSearchParams = {
  /**
   * Overrides the query parameter and performs a more generic search that can be used to find \"similar\" results.
   */
  similarQuery?: string;
  /**
   * Filter the query with numeric, facet and/or tag filters.
   */
  filters?: string;
  /**
   * Filter hits by facet value.
   */
  facetFilters?: string[];
  /**
   * Create filters for ranking purposes, where records that match the filter are ranked higher, or lower in the case of a negative optional filter.
   */
  optionalFilters?: string[];
  /**
   * Filter on numeric attributes.
   */
  numericFilters?: string[];
  /**
   * Filter hits by tags.
   */
  tagFilters?: string[];
  /**
   * Determines how to calculate the total score for filtering.
   */
  sumOrFiltersScores?: boolean;
  /**
   * Retrieve facets and their facet values.
   */
  facets?: string[];
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
   * Specify the page to retrieve.
   */
  page?: number;
  /**
   * Specify the offset of the first hit to return.
   */
  offset?: number;
  /**
   * Set the number of hits to retrieve (used only with offset).
   */
  length?: number;
  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   */
  aroundLatLng?: string;
  /**
   * Search for entries around a given location automatically computed from the requester\'s IP address.
   */
  aroundLatLngViaIP?: boolean;
  /**
   * Define the maximum radius for a geo search (in meters).
   */
  aroundRadius?: number | string | null;
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
  insideBoundingBox?: number[];
  /**
   * Search inside a polygon (in geo coordinates).
   */
  insidePolygon?: number[];
  /**
   * This parameter changes the default values of certain parameters and settings that work best for a natural language query, such as ignorePlurals, removeStopWords, removeWordsIfNoResults, analyticsTags and ruleContexts. These parameters and settings work well together when the query is formatted in natural language instead of keywords, for example when your user performs a voice search.
   */
  naturalLanguages?: string[];
  /**
   * Enables contextual rules.
   */
  ruleContexts?: string[];
  /**
   * Define the impact of the Personalization feature.
   */
  personalizationImpact?: number;
  /**
   * Associates a certain user token with the current search.
   */
  userToken?: string;
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
  analyticsTags?: string[];
  /**
   * Whether to include or exclude a query from the processing-time percentile computation.
   */
  percentileComputation?: boolean;
  /**
   * Whether this search should participate in running AB tests.
   */
  enableABTest?: boolean;
  /**
   * Whether this search should use AI Re-Ranking.
   */
  enableReRanking?: boolean;
};
