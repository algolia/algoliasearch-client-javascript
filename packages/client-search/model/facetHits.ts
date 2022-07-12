// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

export type FacetHits = {
  /**
   * Raw value of the facet.
   */
  value: string;
  /**
   * Markup text with occurrences highlighted.
   */
  highlighted: string;
  /**
   * How many objects contain this facet value. This takes into account the extra search parameters specified in the query. Like for a regular search query, the counts may not be exhaustive.
   */
  count: number;
};
