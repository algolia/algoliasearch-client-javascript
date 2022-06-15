import type { SearchEvent } from './searchEvent';

export type GetSearchesCountResponse = {
  /**
   * The number of occurrences.
   */
  count: number;
  /**
   * A list of search events with their date and count.
   */
  dates: SearchEvent[];
};
