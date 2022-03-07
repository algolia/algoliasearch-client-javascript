import type { GetConversationRateResponseDates } from './getConversationRateResponseDates';

export type GetConversationRateResponse = {
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
   * A list of conversion events with their date.
   */
  dates: GetConversationRateResponseDates[];
};
