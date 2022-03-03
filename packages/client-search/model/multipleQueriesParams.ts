import type { MultipleQueries } from './multipleQueries';
import type { MultipleQueriesStrategy } from './multipleQueriesStrategy';

export type MultipleQueriesParams = {
  requests: MultipleQueries[];
  strategy?: MultipleQueriesStrategy;
};
