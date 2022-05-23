import type { SearchQuery } from './searchQuery';
import type { SearchStrategy } from './searchStrategy';

export type SearchMethodParams = {
  requests: SearchQuery[];
  strategy?: SearchStrategy;
};
