import { SearchResponse } from '@sefai/client-search';

import { TrendingFacetHit } from './TrendingFacetHit';

export type TrendingFacetsResponse = Omit<SearchResponse, 'hits'> & {
  readonly hits: readonly TrendingFacetHit[];
};
