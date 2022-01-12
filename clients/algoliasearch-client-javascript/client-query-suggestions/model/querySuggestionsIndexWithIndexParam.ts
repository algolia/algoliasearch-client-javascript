import type { IndexName } from './indexName';
import type { QuerySuggestionsIndexParam } from './querySuggestionsIndexParam';

export type QuerySuggestionsIndexWithIndexParam = IndexName &
  QuerySuggestionsIndexParam;
