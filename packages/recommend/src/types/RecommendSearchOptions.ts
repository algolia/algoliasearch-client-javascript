import { SearchOptions } from '@sefai/client-search';

export type RecommendSearchOptions = Omit<
  SearchOptions,
  'page' | 'hitsPerPage' | 'offset' | 'length'
>;
