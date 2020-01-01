import { FacetHit } from '.';

export type SearchForFacetValuesResponse = {
  /**
   * The list of facet hits.
   */
  readonly facetHits: readonly FacetHit[];

  /**
   * The exhaustive facets count.
   */
  readonly exhaustiveFacetsCount: boolean;

  /**
   * The time that the API toke the process the request.
   */
  readonly processingTimeMS?: number;
};
