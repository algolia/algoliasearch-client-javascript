import type { NoResultsRateEvent } from './noResultsRateEvent';

export type GetNoResultsRateResponse = {
  /**
   * The click-through rate.
   */
  rate: number;
  /**
   * The number of occurrences.
   */
  count: number;
  /**
   * The number of occurrences.
   */
  noResultCount: number;
  /**
   * A list of searches without results with their date, rate and counts.
   */
  dates: NoResultsRateEvent[];
};
