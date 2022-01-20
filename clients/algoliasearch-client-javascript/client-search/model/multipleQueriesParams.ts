import type { MultipleQueries } from './multipleQueries';

export type MultipleQueriesParams = {
  requests: MultipleQueries[];
  strategy?: MultipleQueriesParamsStrategy;
};

export type MultipleQueriesParamsStrategy = 'none' | 'stopIfEnoughMatches';
