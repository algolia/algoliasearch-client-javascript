import type { MixedSearchFilters } from './mixedSearchFilters';

/**
 * When Dynamic Re-Ranking is enabled, only records that match these filters will be impacted by Dynamic Re-Ranking.
 */
export type ReRankingApplyFilter = MixedSearchFilters[] | string;