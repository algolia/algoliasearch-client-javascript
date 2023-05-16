import { SearchResponse } from '.';
import { SearchForFacetValuesResponse } from './SearchForFacetValuesResponse';

export type MultipleQueriesResponse<TObject> = {
  /**
   * The list of results.
   */
  results: Array<SearchResponse<TObject> | SearchForFacetValuesResponse>;
};
