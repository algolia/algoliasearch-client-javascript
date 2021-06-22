import { SearchOptions } from '@algolia/client-search';

export type RecommendSearchOptions = Omit<
  SearchOptions,
  'page' | 'hitsPerPage' | 'offset' | 'length'
>;
