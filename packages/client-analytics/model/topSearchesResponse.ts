import type { GetSearchesNoResultsResponseSearches } from './getSearchesNoResultsResponseSearches';

export type TopSearchesResponse = {
  /**
   * A list of top searches with their count.
   */
  searches: GetSearchesNoResultsResponseSearches[];
};
