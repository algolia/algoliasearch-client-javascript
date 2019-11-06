import { FacetHit } from '.';

export type SearchForFacetValuesResponse = {
  readonly facetHits: readonly FacetHit[];
  readonly exhaustiveFacetsCount: boolean;
  readonly processingTimeMS?: number;
};
