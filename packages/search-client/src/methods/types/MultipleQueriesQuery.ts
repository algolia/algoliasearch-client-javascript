import { SearchOptions } from './SearchOptions';

export type MultipleQueriesQuery = {
  readonly indexName: string;
  readonly params: SearchOptions;
  readonly query?: string;
};
