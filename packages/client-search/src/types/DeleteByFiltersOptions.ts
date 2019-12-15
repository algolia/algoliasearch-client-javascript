export type DeleteByFiltersOptions = {
  /**
   * Filter the query with numeric, facet and/or tag filters.
   */
  readonly filters?: string;

  /**
   *  Filter hits by facet value.
   */
  readonly facetFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;

  /**
   * Filter on numeric attributes.
   */
  readonly numericFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;

  /**
   * Filter hits by tags. tagFilters is a different way of filtering, which relies on the _tags
   * attribute. It uses a simpler syntax than filters. You can use it when you want to do
   * simple filtering based on tags.
   */
  readonly tagFilters?: string | readonly string[] | ReadonlyArray<readonly string[]>;

  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   */
  readonly aroundLatLng?: string;

  /**
   * Search for entries around a given location automatically computed from the requester’s IP address.
   */
  readonly aroundLatLngViaIP?: boolean;

  /**
   * Search inside a rectangular area (in geo coordinates).
   */
  readonly insideBoundingBox?: ReadonlyArray<readonly number[]>;

  /**
   * Search inside a polygon (in geo coordinates).
   */
  readonly insidePolygon?: ReadonlyArray<readonly number[]>;
};
