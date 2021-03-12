import { Hit } from '.';

export type SearchDictionaryEntriesResponse<TObject = {}> = {
  /**
   * The hits returned by the search.
   *
   * Hits are ordered according to the ranking or sorting of the index being queried.
   */
  hits: Array<Hit<TObject>>;

  /**
   * Index of the current page (zero-based).
   */
  page: number;

  /**
   * Number of hits returned (used only with offset)
   */
  length?: number;

  /**
   * The offset of the first hit to returned.
   */
  offset?: number;

  /**
   * Number of hits matched by the query.
   */
  nbHits: number;

  /**
   * Subset of hits selected when relevancyStrictness is applied.
   */
  nbSortedHits?: number;

  /**
   * Number of pages returned.
   *
   * Calculation is based on the total number of hits (nbHits) divided by the
   * number of hits per page (hitsPerPage), rounded up to the nearest integer.
   */
  nbPages: number;

  /**
   * Maximum number of hits returned per page.
   */
  hitsPerPage: number;

  /**
   * Time the server took to process the request, in milliseconds. This does not include network time.
   */
  processingTimeMS: number;

  /**
   * Whether the nbHits is exhaustive (true) or approximate (false).
   *
   * An approximation is done when the query takes more than 50ms to be
   * processed (this can happen when using complex filters on millions on records).
   */
  exhaustiveNbHits: boolean;

  /**
   * Whether the facet count is exhaustive (true) or approximate (false).
   */
  exhaustiveFacetsCount?: boolean;
};
