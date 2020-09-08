import { SearchResponse } from '.';

export type MultipleQueriesResponse<TObject> = {
  /**
   * The list of results.
   */
  results: Array<SearchResponse<TObject>>;
};
