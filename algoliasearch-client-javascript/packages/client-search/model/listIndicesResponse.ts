import type { Indice } from './indice';

export type ListIndicesResponse = {
  /**
   * List of the fetched indices.
   */
  items?: Indice[];
  /**
   * Number of pages.
   */
  nbPages?: number;
};
