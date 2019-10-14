import { HitWithObjectID } from './HitWithObjectID';
import { SearchResponse } from './SearchResponse';

export type MultipleQueriesResponse<THit extends HitWithObjectID> = {
  readonly results: ReadonlyArray<SearchResponse<THit>>;
};
