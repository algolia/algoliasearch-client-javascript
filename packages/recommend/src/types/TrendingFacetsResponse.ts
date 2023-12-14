import { SearchResponse } from '@algolia/client-search';

import { TrendingFacetHit } from './TrendingFacetHit';

export type TrendingFacetsResponse = Omit<SearchResponse, 'hits'> & {
  readonly hits: readonly TrendingFacetHit[];
};
