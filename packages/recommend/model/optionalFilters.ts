// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { MixedSearchFilters } from './mixedSearchFilters';

/**
 * Create filters for ranking purposes, where records that match the filter are ranked higher, or lower in the case of a negative optional filter.
 */
export type OptionalFilters = MixedSearchFilters[] | string;
