import { SearchOptions } from '.';

export type MultipleQueriesQuery = {
  readonly indexName: string;
  readonly params?: SearchOptions;
  readonly query?: string;
};
