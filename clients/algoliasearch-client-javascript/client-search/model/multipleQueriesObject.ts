import type { MultipleQueries } from './multipleQueries';

export type MultipleQueriesObject = {
  requests: MultipleQueries[];
  strategy?: MultipleQueriesObjectStrategy;
};

export type MultipleQueriesObjectStrategy = 'none' | 'stopIfEnoughMatches';
