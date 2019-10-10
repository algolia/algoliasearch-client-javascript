export type DeleteByFiltersOptions = {
  /* eslint-disable functional/prefer-readonly-type */
  filters?: string;
  facetFilters?: string[][];
  numericFilters?: string[][];
  tagFilters?: string[] | string[][];
  aroundLatLng?: string;
  aroundLatLngViaIP?: boolean;
  insideBoundingBox?: number[][];
  insidePolygon?: number[][];
};
