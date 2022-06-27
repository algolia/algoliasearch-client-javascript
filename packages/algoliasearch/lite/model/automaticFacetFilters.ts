import type { AutomaticFacetFilter } from './automaticFacetFilter';

/**
 * Names of facets to which automatic filtering must be applied; they must match the facet name of a facet value placeholder in the query pattern.
 */
export type AutomaticFacetFilters = AutomaticFacetFilter[] | string[];
