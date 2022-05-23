import type { SearchTypeDefault } from './searchTypeDefault';

export type SearchForHitsOptions = {
  /**
   * The Algolia index name.
   */
  indexName: string;
  type?: SearchTypeDefault;
} & { facet?: never; maxFacetHits?: never; facetQuery?: never };
