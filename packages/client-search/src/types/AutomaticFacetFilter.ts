export type AutomaticFacetFilter = {
  /** Attribute to filter on. This must match a facet placeholder in the rule’s pattern. */
  readonly facet?: string;

  /** Whether the filter is disjunctive (true) or conjunctive (false). */
  readonly disjunctive?: boolean;

  /** Score for the filter. Typically used for optional or disjunctive filters. */
  readonly score?: number;
};
