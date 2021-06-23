import { Index } from '.';

export type ListIndicesResponse = {
  /**
   * Number of pages
   */
  nbPages: number;

  /**
   * List of index response
   */
  items: Index[];
};
