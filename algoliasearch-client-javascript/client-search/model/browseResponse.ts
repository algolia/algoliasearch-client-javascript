import type { BaseBrowseResponse } from './baseBrowseResponse';
import type { BaseSearchResponse } from './baseSearchResponse';
import type { SearchHits } from './searchHits';

export type BrowseResponse = BaseBrowseResponse &
  BaseSearchResponse &
  SearchHits;
