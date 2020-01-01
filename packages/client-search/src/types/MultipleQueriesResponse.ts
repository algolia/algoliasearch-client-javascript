import { ObjectWithObjectID, SearchResponse } from '.';

export type MultipleQueriesResponse<TObject> = {
  /**
   * The list of results.
   */
  readonly results: ReadonlyArray<SearchResponse<TObject & ObjectWithObjectID>>;
};
