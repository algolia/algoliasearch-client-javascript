export type GetClickThroughRateResponseDates = {
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
   * Date of the event.
   */
  date: string;
};
