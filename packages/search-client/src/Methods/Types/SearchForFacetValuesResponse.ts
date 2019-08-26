import { FacetHit } from './FacetHit';

export type SearchForFacetValuesResponse = {
  /* eslint-disable functional/prefer-readonly-type */
  facetHits: FacetHit[];
  exhaustiveFacetsCount: boolean;
  processingTimeMS?: number;
};
