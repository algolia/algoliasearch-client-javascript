import { ObjectWithObjectID } from '.';

// @todo add docs here.
export type SearchResponse<TObject = {}> = {
  readonly hits: ReadonlyArray<TObject & ObjectWithObjectID>;
  readonly page: number;
  readonly length?: number;
  readonly offset?: number;
  readonly nbHits: number;
  readonly nbPages: number;
  readonly hitsPerPage: number;
  readonly processingTimeMS: number;
  readonly exhaustiveNbHits: boolean;
  readonly exhaustiveFacetsCount?: boolean;
  readonly facets?: Readonly<Record<string, Readonly<Record<string, number>>>>;
  readonly facetsStats?: Readonly<
    Record<
      string,
      {
        readonly min: number;
        readonly max: number;
        readonly avg: number;
        readonly sum: number;
      }
    >
  >;
  readonly query: string;
  readonly queryAfterRemoval?: string;
  readonly params: string;
  readonly queryID?: string;
  readonly message?: string;
  readonly aroundLatLng?: string;
  readonly automaticRadius?: string;
  readonly serverUsed?: string;
  readonly index?: string;
  readonly indexUsed?: string;
  readonly abTestVariantID?: number;
  readonly parsedQuery?: string;
  readonly userData?: any;
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
