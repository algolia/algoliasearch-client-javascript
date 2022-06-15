import type { SearchNoClickEvent } from './searchNoClickEvent';

export type GetSearchesNoClicksResponse = {
  /**
   * A list of searches with no clicks and their count.
   */
  searches: SearchNoClickEvent[];
};
