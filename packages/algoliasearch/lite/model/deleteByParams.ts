// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { AroundRadius } from './aroundRadius';
import type { FacetFilters } from './facetFilters';
import type { NumericFilters } from './numericFilters';
import type { TagFilters } from './tagFilters';

export type DeleteByParams = {
  facetFilters?: FacetFilters;

  /**
   * Filter the query with numeric, facet and/or tag filters.
   */
  filters?: string;

  numericFilters?: NumericFilters;

  tagFilters?: TagFilters;

  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   */
  aroundLatLng?: string;

  aroundRadius?: AroundRadius;

  /**
   * Search inside a rectangular area (in geo coordinates).
   */
  insideBoundingBox?: number[];

  /**
   * Search inside a polygon (in geo coordinates).
   */
  insidePolygon?: number[];
};
