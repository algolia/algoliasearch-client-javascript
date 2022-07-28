// This file is generated, manual changes will be lost - read more on https://github.com/algolia/api-clients-automation.

import type { BaseSearchResponse } from './baseSearchResponse';
import type { SearchHits } from './searchHits';

export type SearchResponse<T = Record<string, any>> = BaseSearchResponse &
  SearchHits<T>;
