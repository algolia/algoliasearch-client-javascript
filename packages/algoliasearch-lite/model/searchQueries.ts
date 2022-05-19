import type { SearchParams } from './searchParams';
import type { SearchType } from './searchType';

export type SearchQueries = {
  /**
   * The Algolia index name.
   */
  indexName: string;
  /**
   * The text to search in the index.
   */
  query?: string;
  type?: SearchType;
  /**
   * The `facet` name.
   */
  facet?: string;
  params?: SearchParams;
};
