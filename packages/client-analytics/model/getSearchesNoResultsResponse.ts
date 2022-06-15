import type { SearchNoResultEvent } from './searchNoResultEvent';

export type GetSearchesNoResultsResponse = {
  /**
   * A list of searches with no results and their count.
   */
  searches: SearchNoResultEvent[];
};
