import { ObjectWithObjectID, SearchResponse } from '.';

export type MultipleQueriesResponse<TObject> = {
  readonly results: ReadonlyArray<SearchResponse<TObject & ObjectWithObjectID>>;
};
