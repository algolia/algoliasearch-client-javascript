import { SearchResponse } from './SearchResponse';

export type MultipleQueriesResponse<THit> = {
  /* eslint-disable functional/prefer-readonly-type */
  results: Array<SearchResponse<THit>>;
};
