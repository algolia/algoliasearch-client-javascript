import type { TopSearch } from './topSearch';

export type TopSearchesResponse = {
  /**
   * A list of top searches with their count.
   */
  searches: TopSearch[];
};
