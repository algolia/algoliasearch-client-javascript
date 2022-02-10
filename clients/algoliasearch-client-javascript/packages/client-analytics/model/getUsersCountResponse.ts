import type { GetSearchesCountResponseDates } from './getSearchesCountResponseDates';

export type GetUsersCountResponse = {
  /**
   * The number of occurrences.
   */
  count: number;
  /**
   * A list of users count with their date.
   */
  dates: GetSearchesCountResponseDates[];
};
