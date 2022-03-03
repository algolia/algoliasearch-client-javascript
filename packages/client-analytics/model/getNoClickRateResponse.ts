import type { GetNoClickRateResponseDates } from './getNoClickRateResponseDates';

export type GetNoClickRateResponse = {
  /**
   * The click-through rate.
   */
  rate: number;
  /**
   * The number of click event.
   */
  count: number;
  /**
   * The number of click event.
   */
  noClickCount: number;
  /**
   * A list of searches without clicks with their date, rate and counts.
   */
  dates: GetNoClickRateResponseDates[];
};
