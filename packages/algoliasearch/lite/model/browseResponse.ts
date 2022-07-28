// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { BaseBrowseResponse } from './baseBrowseResponse';
import type { BaseSearchResponse } from './baseSearchResponse';
import type { SearchHits } from './searchHits';

export type BrowseResponse<T = Record<string, any>> = BaseBrowseResponse &
  BaseSearchResponse &
  SearchHits<T>;
