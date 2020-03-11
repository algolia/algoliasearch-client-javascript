import { FacetHit } from '.';

export type SearchForFacetValuesResponse = {
  /**
   * The list of facet hits.
   */
  facetHits: FacetHit[];

  /**
   * The exhaustive facets count.
   */
  exhaustiveFacetsCount: boolean;

  /**
   * The time that the API toke the process the request.
   */
  processingTimeMS?: number;
};
