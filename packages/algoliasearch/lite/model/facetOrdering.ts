import type { Facets } from './facets';
import type { Value } from './value';

/**
 * Defining how facets should be ordered.
 */
export type FacetOrdering = {
  facets?: Facets;
  /**
   * The ordering of facet values, within an individual list.
   */
  values?: Record<string, Value>;
};
