import type { Index } from './index';

export type ListIndicesResponse = {
  /**
   * List of the fetched indices.
   */
  items?: Index[];
  /**
   * Number of pages.
   */
  nbPages?: number;
};
