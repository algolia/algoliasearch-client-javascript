import type { GetSearchesCountResponseDates } from './getSearchesCountResponseDates';

export type GetSearchesCountResponse = {
  /**
   * The number of occurrences.
   */
  count: number;
  /**
   * A list of search events with their date and count.
   */
  dates: GetSearchesCountResponseDates[];
};
