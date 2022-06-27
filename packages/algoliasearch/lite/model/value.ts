import type { SortRemainingBy } from './sortRemainingBy';

export type Value = {
  /**
   * Pinned order of facet lists.
   */
  order?: string[];
  sortRemainingBy?: SortRemainingBy;
};
