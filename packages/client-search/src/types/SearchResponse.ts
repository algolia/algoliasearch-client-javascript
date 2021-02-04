import { Hit } from '.';

export type SearchResponse<TObject = {}> = {
  /**
   * The hits returned by the search.
   *
   * Hits are ordered according to the ranking or sorting of the index being queried.
   */
  hits: Array<Hit<TObject>>;

  /**
   * Index of the current page (zero-based).
   */
  page: number;

  /**
   * Number of hits returned (used only with offset)
   */
  length?: number;

  /**
   * The offset of the first hit to returned.
   */
  offset?: number;

  /**
   * Number of hits matched by the query.
   */
  nbHits: number;

  /**
   * Subset of hits selected when relevancyStrictness is applied.
   */
  nbSortedHits?: number;

  /**
   * Number of pages returned.
   *
   * Calculation is based on the total number of hits (nbHits) divided by the
   * number of hits per page (hitsPerPage), rounded up to the nearest integer.
   */
  nbPages: number;

  /**
   * Maximum number of hits returned per page.
   */
  hitsPerPage: number;

  /**
   * Time the server took to process the request, in milliseconds. This does not include network time.
   */
  processingTimeMS: number;

  /**
   * Whether the nbHits is exhaustive (true) or approximate (false).
   *
   * An approximation is done when the query takes more than 50ms to be
   * processed (this can happen when using complex filters on millions on records).
   */
  exhaustiveNbHits: boolean;

  /**
   * Whether the facet count is exhaustive (true) or approximate (false).
   */
  exhaustiveFacetsCount?: boolean;

  /**
   * A mapping of each facet name to the corresponding facet counts.
   */
  facets?: Record<string, Record<string, number>>;

  /**
   * Statistics for numerical facets.
   */
  facets_stats?: Record<
    string,
    {
      /**
       * The minimum value in the result set.
       */
      min: number;

      /**
       * The maximum value in the result set.
       */
      max: number;

      /**
       * The average facet value in the result set.
       */
      avg: number;

      /**
       * The sum of all values in the result set.
       */
      sum: number;
    }
  >;

  /**
   * The query used to search. Accepts every character, and every character entered will be used in the search.
   *
   * An empty query can be used to fetch all records.
   */
  query: string;

  /**
   * A markup text indicating which parts of the original query have been removed in order to retrieve a non-empty result set.
   */
  queryAfterRemoval?: string;

  /**
   * A url-encoded string of all search parameters.
   */
  params: string;

  /**
   * Unique identifier of the search query, to be sent in Insights methods. This identifier links events back to the search query it represents.
   *
   * Returned only if clickAnalytics is true.
   */
  queryID?: string;

  /**
   * Used to return warnings about the query.
   */
  message?: string;

  /**
   * The computed geo location.
   *
   * Format: "lat,lng", where the latitude and longitude are expressed as decimal floating point number.
   */
  aroundLatLng?: string;

  /**
   * The automatically computed radius.
   */
  automaticRadius?: string;

  /**
   * Actual host name of the server that processed the request.
   *
   * Our DNS supports automatic failover and load balancing, so this may differ from the host name used in the request.
   */
  serverUsed?: string;

  /**
   * Index name used for the query.
   */
  index?: string;

  /**
   * Index name used for the query. In case of AB test, the index targetted isn’t always the index used by the query.
   */
  indexUsed?: string;

  /**
   * In case of AB test, reports the variant ID used. The variant ID is the position in the array of variants (starting at 1).
   */
  abTestVariantID?: number;

  /**
   * The query string that will be searched, after normalization.
   */
  parsedQuery?: string;

  /**
   * Custom user data.
   */
  userData?: any;

  /**
   * Rules applied to the query.
   */
  appliedRules?: Array<Record<string, any>>;

  /**
   * The explanation of the decompounding at query time.
   */
  explain?: {
    /**
     * The explain query match.
     */
    match: {
      /**
       * The explain query match alternatives.
       */
      alternatives: Array<{
        /**
         * The alternative type.
         */
        types: string[];

        /**
         * The list of alternative words.
         */
        words: string[];

        /**
         * The number of typos.
         */
        typos: number;

        /**
         * The offset.
         */
        offset: number;

        /**
         * The length.
         */
        length: number;
      }>;
    };

    /**
     * Query parameter reporting. Parameters are reported
     * as a JSON object with one field per parameter.
     */
    params?: Record<string, any>;
  };

  /**
   * The relevancy threshold applied to search in a virtual index.
   */
  appliedRelevancyStrictness?: number;
};
