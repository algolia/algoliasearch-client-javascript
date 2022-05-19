import type { SearchQueries } from './searchQueries';
import type { SearchStrategy } from './searchStrategy';

export type SearchMethodParams = {
  requests: SearchQueries[];
  strategy?: SearchStrategy;
};
