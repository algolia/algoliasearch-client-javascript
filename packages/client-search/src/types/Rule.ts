import { SearchOptions } from '.';

export type Rule = {
  /**
   * Unique identifier for the rule (format: [A-Za-z0-9_-]+).
   */
  readonly objectID: string;

  /**
   * Condition of the rule, expressed using the following variables: pattern, anchoring, context.
   *
   * @deprecated This parameter is deprecated in favor of `conditions`.
   */
  readonly condition?: Condition;

  /**
   * Conditions of the rule, expressed using the following variables: pattern, anchoring, context.
   */
  readonly conditions?: readonly Condition[];

  /**
   * Consequence of the rule. At least one of the following object must be used: params, promote, hide, userData.
   */
  readonly consequence?: Consequence;

  /**
   * This field is intended for rule management purposes, in particular to ease searching for rules and presenting them to human readers. It is not interpreted by the API.
   */
  readonly description?: string;

  /**
   * Whether the rule is enabled. Disabled rules remain in the index, but are not applied at query time.
   */
  readonly enabled?: boolean;

  /**
   * By default, rules are permanently valid. When validity periods are specified, the rule applies only during those periods; it is ignored the rest of the time.
   * The list must not be empty.
   */
  readonly validity?: readonly TimeRange[];
};

export type AutomaticFacetFilter = {
  /**
   * Attribute to filter on. This must match a facet placeholder in the rule’s pattern.
   */
  readonly facet: string;

  /**
   * Whether the filter is disjunctive (true) or conjunctive (false).
   */
  readonly disjunctive?: boolean;

  /**
   * Score for the filter. Typically used for optional or disjunctive filters.
   */
  readonly score?: number;
};

export type ConsequenceQuery = {
  /**
   * List of removes.
   */
  readonly remove?: readonly string[];

  /**
   * List of edits.
   */
  readonly edits?: ReadonlyArray<{
    /**
     * Type of edit.
     */
    readonly type?: 'remove' | 'replace';

    /**
     * Text or patterns to remove from the query string.
     */
    readonly delete?: string;

    /**
     * Text that should be inserted in place of the removed text inside the query string.
     */
    readonly insert?: string;
  }>;
};

export type ConsequencePromote =
  | {
      /**
       * Unique identifier of the object to promote.
       */
      readonly objectID: string;

      /**
       * Promoted rank for the object (zero-based).
       */
      readonly position: number;
    }
  | {
      /**
       * List of unique identifiers for the objects to promote.
       */
      readonly objectIDs: readonly string[];

      /**
       * Promoted start rank for the objects (zero-based).
       */
      readonly position: number;
    };

export type ConsequenceParams = {
  /**
   * When providing a string, it replaces the entire query string.
   * When providing an object, it describes incremental edits to be made to the query string (but you can’t do both).
   */
  readonly query?: ConsequenceQuery | string;

  /**
   * Names of facets to which automatic filtering must be applied; they must match the facet name of a facet value placeholder in the query pattern.
   */
  readonly automaticFacetFilters?: readonly AutomaticFacetFilter[] | readonly string[];

  /**
   * Same syntax as automaticFacetFilters, but the engine treats the filters as optional.
   * Behaves like optionalFilters.
   */
  readonly automaticOptionalFacetFilters?: readonly AutomaticFacetFilter[];
};

export type Condition = {
  /**
   * Query patterns are expressed as a string with a specific syntax. A pattern is a sequence of tokens.
   */
  readonly pattern?: string;

  /**
   * Apply this rule only when the filter matches.
   */
  readonly filters?: string;

  /**
   * is | startsWith | endsWith | contains: Whether the pattern must match the beginning or the end of the query string, or both, or none.
   */
  readonly anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains';

  /**
   * Rule context (format: [A-Za-z0-9_-]+). When specified, the rule is contextual and applies only when the same context is specified at query time (using the ruleContexts parameter).
   * When absent, the rule is generic and always applies (provided that its other conditions are met, of course).
   */
  readonly context?: string;

  /**
   * If set to true, alternatives make the rule to trigger on synonyms, typos and plurals.
   * Note that setting ignorePlurals to false overrides this parameter.
   */
  readonly alternatives?: boolean;
};

export type Consequence = {
  /**
   * Additional search parameters. Any valid search parameter is allowed.
   */
  readonly params?: ConsequenceParams & Pick<SearchOptions, Exclude<keyof SearchOptions, 'query'>>;

  /**
   * Objects to promote as hits.
   */
  readonly promote?: readonly ConsequencePromote[];

  /**
   * Objects to hide from hits.
   */
  readonly hide?: ReadonlyArray<{ readonly objectID: string }>;

  /**
   * Whether the Query Rule should promote or not promoted items.
   */
  readonly filterPromotes?: boolean;

  /**
   * Custom JSON object that will be appended to the userData array in the response.
   * This object is not interpreted by the API. It is limited to 1kB of minified JSON.
   */
  readonly userData?: any;
};

export type TimeRange = {
  /**
   * DateTime with UTC offset for Serialization/Deserialization in unix timespam.
   */
  readonly from: number;

  /**
   * DateTime with UTC offset for Serialization/Deserialization in unix timespam.
   */
  readonly until: number;
};
