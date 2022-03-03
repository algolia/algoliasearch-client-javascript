import type { AutomaticFacetFilter } from './automaticFacetFilter';

/**
 * Additional search parameters. Any valid search parameter is allowed.
 */
export type Params = {
  /**
   * Query string.
   */
  query?: string;
  /**
   * Names of facets to which automatic filtering must be applied; they must match the facet name of a facet value placeholder in the query pattern.
   */
  automaticFacetFilters?: AutomaticFacetFilter[];
  /**
   * Same syntax as automaticFacetFilters, but the engine treats the filters as optional.
   */
  automaticOptionalFacetFilters?: AutomaticFacetFilter[];
};
