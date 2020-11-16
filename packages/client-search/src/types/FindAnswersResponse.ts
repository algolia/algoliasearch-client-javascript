import { Hit } from './Hit';
import { SearchResponse } from './SearchResponse';

export type FindAnswersResponse<TObject = {}> = SearchResponse<TObject> & {
  /**
   * The hits returned by the search.
   *
   * Hits are ordered according to the ranking or sorting of the index being queried.
   */
  hits: Array<
    Hit<
      TObject & {
        _answer?: {
          extract: string;
          score: number;
          extractAttribute: string;
        };
      }
    >
  >;
};
