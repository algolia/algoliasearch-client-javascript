import type { UserWithDate } from './userWithDate';

export type GetUsersCountResponse = {
  /**
   * The number of occurrences.
   */
  count: number;
  /**
   * A list of users count with their date.
   */
  dates: UserWithDate[];
};
