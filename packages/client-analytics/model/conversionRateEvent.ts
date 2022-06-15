export type ConversionRateEvent = {
  /**
   * The click-through rate.
   */
  rate: number;
  /**
   * The number of tracked search click.
   */
  trackedSearchCount: number;
  /**
   * The number of converted clicks.
   */
  conversionCount: number;
  /**
   * Date of the event.
   */
  date: string;
};
