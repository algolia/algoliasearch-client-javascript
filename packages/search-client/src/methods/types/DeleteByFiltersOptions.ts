export type DeleteByFiltersOptions = {
  readonly filters?: string;
  readonly facetFilters?: ReadonlyArray<readonly string[]>;
  readonly numericFilters?: ReadonlyArray<readonly string[]>;
  readonly tagFilters?: readonly string[] | ReadonlyArray<readonly string[]>;
  readonly aroundLatLng?: string;
  readonly aroundLatLngViaIP?: boolean;
  readonly insideBoundingBox?: ReadonlyArray<readonly number[]>;
  readonly insidePolygon?: ReadonlyArray<readonly number[]>;
};
