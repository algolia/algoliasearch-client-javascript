import { ObjectWithObjectID } from '.';

export type SearchResponse<TObject = {}> = {
  /**
   * The hits returned by the search.
   *
   * Hits are ordered according to the ranking or sorting of the index being queried.
   */
  readonly hits: ReadonlyArray<TObject & ObjectWithObjectID>;

  /**
   * Index of the current page (zero-based).
   */
  readonly page: number;

  /**
   * Number of hits returned (used only with offset)
   */
  readonly length?: number;

  /**
   * The offset of the first hit to returned.
   */
  readonly offset?: number;

  /**
   * Number of hits matched by the query.
   */
  readonly nbHits: number;

  /**
   * Number of pages returned.
   *
   * Calculation is based on the total number of hits (nbHits) divided by the
   * number of hits per page (hitsPerPage), rounded up to the nearest integer.
   */
  readonly nbPages: number;

  /**
   * Maximum number of hits returned per page.
   */
  readonly hitsPerPage: number;

  /**
   * Time the server took to process the request, in milliseconds. This does not include network time.
   */
  readonly processingTimeMS: number;

  /**
   * Whether the nbHits is exhaustive (true) or approximate (false).
   *
   * An approximation is done when the query takes more than 50ms to be
   * processed (this can happen when using complex filters on millions on records).
   */
  readonly exhaustiveNbHits: boolean;

  /**
   * Whether the facet count is exhaustive (true) or approximate (false).
   */
  readonly exhaustiveFacetsCount?: boolean;

  /**
   * A mapping of each facet name to the corresponding facet counts.
   */
  readonly facets?: Readonly<Record<string, Readonly<Record<string, number>>>>;

  /**
   * Statistics for numerical facets.
   */
  readonly facetsStats?: Readonly<
    Record<
      string,
      {
        /**
         * The minimum value in the result set.
         */
        readonly min: number;

        /**
         * The maximum value in the result set.
         */
        readonly max: number;

        /**
         * The average facet value in the result set.
         */
        readonly avg: number;

        /**
         * The sum of all values in the result set.
         */
        readonly sum: number;
      }
    >
  >;

  /**
   * The query used to search. Accepts every character, and every character entered will be used in the search.
   *
   * An empty query can be used to fetch all records.
   */
  readonly query: string;

  /**
   * A markup text indicating which parts of the original query have been removed in order to retrieve a non-empty result set.
   */
  readonly queryAfterRemoval?: string;

  /**
   * A url-encoded string of all search parameters.
   */
  readonly params: string;

  /**
   * Unique identifier of the search query, to be sent in Insights methods. This identifier links events back to the search query it represents.
   *
   * Returned only if clickAnalytics is true.
   */
  readonly queryID?: string;

  /**
   * Used to return warnings about the query.
   */
  readonly message?: string;

  /**
   * The computed geo location.
   *
   * Format: "lat,lng", where the latitude and longitude are expressed as decimal floating point number.
   */
  readonly aroundLatLng?: string;

  /**
   * The automatically computed radius.
   */
  readonly automaticRadius?: string;

  /**
   * Actual host name of the server that processed the request.
   *
   * Our DNS supports automatic failover and load balancing, so this may differ from the host name used in the request.
   */
  readonly serverUsed?: string;

  /**
   * Index name used for the query.
   */
  readonly index?: string;

  /**
   * Index name used for the query. In case of AB test, the index targetted isn’t always the index used by the query.
   */
  readonly indexUsed?: string;

  /**
   * In case of AB test, reports the variant ID used. The variant ID is the position in the array of variants (starting at 1).
   */
  readonly abTestVariantID?: number;

  /**
   * The query string that will be searched, after normalization.
   */
  readonly parsedQuery?: string;

  /**
   * Custom user data.
   */
  readonly userData?: any;

  /**
   * Rules applied to the query.
   */
  readonly appliedRules?: ReadonlyArray<Readonly<Record<string, any>>>;

  /**
   * The explanation of the decompounding at query time.
   */
  readonly explain?: {
    /**
     * The explain query match.
     */
    readonly match: {
      /**
       * The explain query match alternatives.
       */
      readonly alternatives: ReadonlyArray<{
        /**
         * The alternative type.
         */
        readonly types: readonly string[];

        /**
         * The list of alternative words.
         */
        readonly words: readonly string[];

        /**
         * The number of typos.
         */
        readonly typos: number;

        /**
         * The offset.
         */
        readonly offset: number;

        /**
         * The length.
         */
        readonly length: number;
      }>;
    };

    /**
     * Query parameter reporting. Parameters are reported
     * as a JSON object with one field per parameter.
     */
    readonly params?: Readonly<Record<string, any>>;
  };
};
