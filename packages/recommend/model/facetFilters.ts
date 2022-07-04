import type { MixedSearchFilters } from './mixedSearchFilters';

/**
 * Filter hits by facet value.
 */
export type FacetFilters = MixedSearchFilters[] | string;
