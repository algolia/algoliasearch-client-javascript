import { DictionaryEntry } from './DictionaryEntry';

export type SearchDictionaryEntriesResponse = {
  /**
   * The dictionary entries returned by the search.
   */
  hits: DictionaryEntry[];

  /**
   * Index of the current page (zero-based).
   */
  page: number;

  /**
   * Number of dictionary entries matched by the query.
   */
  nbHits: number;

  /**
   * Number of pages returned.
   *
   * Calculation is based on the total number of hits (nbHits) divided by the
   * number of hits per page (hitsPerPage), rounded up to the nearest integer.
   */
  nbPages: number;
};
