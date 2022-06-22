import type { FetchedIndex } from './fetchedIndex';

export type ListIndicesResponse = {
  /**
   * List of the fetched indices.
   */
  items?: FetchedIndex[];
  /**
   * Number of pages.
   */
  nbPages?: number;
};
