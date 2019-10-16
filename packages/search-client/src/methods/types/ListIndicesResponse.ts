import { Indice } from './Indice';

export type ListIndicesResponse = {
  /** Number of pages */
  readonly nbPages: number;

  /** List of index response */
  readonly items: readonly Indice[];
};
