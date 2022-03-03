import type { GetClickThroughRateResponseDates } from './getClickThroughRateResponseDates';

export type GetClickThroughRateResponse = {
  /**
   * The click-through rate.
   */
  rate: number;
  /**
   * The number of click event.
   */
  clickCount: number;
  /**
   * The number of tracked search click.
   */
  trackedSearchCount: number;
  /**
   * A list of click-through rate events with their date.
   */
  dates: GetClickThroughRateResponseDates[];
};
