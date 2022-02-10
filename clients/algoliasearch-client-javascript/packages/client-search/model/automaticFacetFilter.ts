/**
 * Automatic facet Filter.
 */
export type AutomaticFacetFilter = {
  /**
   * Attribute to filter on. This must match a facet placeholder in the Rule\'s pattern.
   */
  facet: string;
  /**
   * Score for the filter. Typically used for optional or disjunctive filters.
   */
  score?: number;
  /**
   * Whether the filter is disjunctive (true) or conjunctive (false).
   */
  disjunctive?: boolean;
};
