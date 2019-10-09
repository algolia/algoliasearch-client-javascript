export type AutomaticFacetFilter = {
  /* eslint-disable functional/prefer-readonly-type */

  /** Attribute to filter on. This must match a facet placeholder in the rule’s pattern. */
  facet?: string;

  /** Whether the filter is disjunctive (true) or conjunctive (false). */
  disjunctive?: boolean;

  /** Score for the filter. Typically used for optional or disjunctive filters. */
  score?: number;
};
