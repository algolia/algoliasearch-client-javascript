import { Hit, SearchResponse } from '.';

export type MultipleQueriesResponse<TObject> = {
  /**
   * The list of results.
   */
  results: Array<SearchResponse<Hit<TObject>>>;
};
