import type { GetTopFiltersNoResultsValue } from './getTopFiltersNoResultsValue';

export type GetTopFiltersNoResultsValues = {
  /**
   * The number of occurrences.
   */
  count: number;
  /**
   * A list of filters without results.
   */
  values: GetTopFiltersNoResultsValue[];
};
