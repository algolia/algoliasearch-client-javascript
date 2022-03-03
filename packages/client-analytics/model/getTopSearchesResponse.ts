import type { GetSearchesNoResultsResponseSearches } from './getSearchesNoResultsResponseSearches';

export type GetTopSearchesResponse = {
  /**
   * A list of top searches with their count.
   */
  searches: GetSearchesNoResultsResponseSearches[];
};
