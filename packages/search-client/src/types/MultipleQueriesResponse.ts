import { ObjectWithObjectID } from './ObjectWithObjectID';
import { SearchResponse } from './SearchResponse';

export type MultipleQueriesResponse<TObject> = {
  readonly results: ReadonlyArray<SearchResponse<TObject & ObjectWithObjectID>>;
};
